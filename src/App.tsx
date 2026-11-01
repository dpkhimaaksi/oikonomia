import React, { useState, useEffect } from 'react';
import { Header, MainNavTab } from './components/navigation/Header';
import { NewsListView } from './components/news/NewsListView';
import { MaterialsListView } from './components/materials/MaterialsListView';
import { DashboardView } from './components/dashboard/DashboardView';
import { ContentViewer } from './components/content/ContentViewer';
import { FeedbackModal } from './components/feedback/FeedbackModal';
import { ModeratorSecretLogin } from './components/auth/ModeratorSecretLogin';
import { UserAuthModal } from './components/auth/UserAuthModal';
import { ThemeProvider } from './context/ThemeContext';
import { storageService } from './services/storage';
import { User, MaterialNewsItem } from './types/database';
import { Lock } from 'lucide-react';

function AppContent() {
  const [activeTab, setActiveTab] = useState<MainNavTab>('berita');
  const [currentUser, setCurrentUser] = useState<User | null>(storageService.getCurrentUser());
  const [selectedContent, setSelectedContent] = useState<MaterialNewsItem | null>(null);

  // Modals & Screen states
  const [isModeratorPortalOpen, setIsModeratorPortalOpen] = useState(false);
  const [isUserAuthModalOpen, setIsUserAuthModalOpen] = useState(false);
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);

  // Contents (Empty initial state per requirements)
  const [newsList, setNewsList] = useState<MaterialNewsItem[]>([]);
  const [materialsList, setMaterialsList] = useState<MaterialNewsItem[]>([]);

  const refreshContents = () => {
    setNewsList(storageService.getContents('berita'));
    setMaterialsList(storageService.getContents('materi'));
  };

  // URL Hash Listener for secret moderator portal (e.g. #/portal-moderator)
  useEffect(() => {
    const handleHashChange = () => {
      if (
        window.location.hash === '#/portal-moderator' ||
        window.location.hash === '#portal-moderator'
      ) {
        setIsModeratorPortalOpen(true);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // check on load

    refreshContents();
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleSelectTab = (tab: MainNavTab) => {
    if (tab === 'dashboard' && currentUser?.role !== 'moderator') {
      setIsModeratorPortalOpen(true);
      return;
    }
    setActiveTab(tab);
    setSelectedContent(null);
    setIsModeratorPortalOpen(false);
    refreshContents();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenContent = (item: MaterialNewsItem) => {
    setSelectedContent(item);
    setIsModeratorPortalOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToList = () => {
    setSelectedContent(null);
    refreshContents();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleModeratorLoginSuccess = (modUser: User) => {
    setCurrentUser(modUser);
    setIsModeratorPortalOpen(false);
    setActiveTab('dashboard');
    window.location.hash = '';
    refreshContents();
  };

  const handleUserAuthSuccess = (user: User) => {
    setCurrentUser(user);
    refreshContents();
  };

  const handleLogout = () => {
    storageService.logout();
    setCurrentUser(null);
    if (activeTab === 'dashboard') {
      setActiveTab('berita');
    }
    refreshContents();
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans selection:bg-slate-900 dark:selection:bg-sky-500 selection:text-white transition-colors duration-200">
      {/* Top Bar Navigation */}
      <Header
        activeTab={activeTab}
        onSelectTab={handleSelectTab}
        currentUser={currentUser}
        onOpenFeedback={() => setIsFeedbackOpen(true)}
        onLogout={handleLogout}
        onOpenAuth={() => setIsUserAuthModalOpen(true)}
      />

      {/* Main Workspace Frame */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {/* Secret Moderator Login Screen */}
        {isModeratorPortalOpen ? (
          <ModeratorSecretLogin
            onSuccess={handleModeratorLoginSuccess}
            onCancel={() => {
              setIsModeratorPortalOpen(false);
              window.location.hash = '';
            }}
          />
        ) : selectedContent ? (
          <ContentViewer
            content={selectedContent}
            currentUser={currentUser}
            onBack={handleBackToList}
            onOpenAuth={() => setIsUserAuthModalOpen(true)}
          />
        ) : (
          <>
            {activeTab === 'berita' && (
              <NewsListView
                newsList={newsList}
                currentUser={currentUser}
                onSelectNews={handleOpenContent}
                onGoToDashboard={() => handleSelectTab('dashboard')}
              />
            )}

            {activeTab === 'materi' && (
              <MaterialsListView
                materialsList={materialsList}
                currentUser={currentUser}
                onSelectMaterial={handleOpenContent}
                onGoToDashboard={() => handleSelectTab('dashboard')}
              />
            )}

            {activeTab === 'dashboard' && currentUser?.role === 'moderator' && (
              <DashboardView
                currentUser={currentUser}
                onViewContent={handleOpenContent}
              />
            )}
          </>
        )}
      </main>

      {/* Footer with Discreet Moderator Access Link */}
      <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-8 transition-colors">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-2.5">
            <img
              src="/OIKONOMIA.png"
              alt="Logo"
              className="w-5 h-5 rounded object-contain bg-white dark:bg-slate-800 p-0.5"
            />
            <span className="font-bold text-slate-900 dark:text-white">Oikonomia</span>
            <span aria-hidden="true">·</span>
            <span>bank materi akuntansi & berita ekonomi</span>
          </div>

          <div className="flex items-center gap-4 text-2xs text-slate-400 dark:text-slate-500">
            <span>Akses Terbuka untuk Publik</span>
            <span aria-hidden="true">·</span>
            <button
              onClick={() => {
                setIsModeratorPortalOpen(true);
                window.location.hash = '/portal-moderator';
              }}
              className="text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition-colors flex items-center gap-1 font-mono"
              title="Portal Khusus Pengelola Sistem"
            >
              <Lock className="w-3 h-3 text-slate-400 dark:text-slate-500" />
              <span>Portal Moderator</span>
            </button>
          </div>
        </div>
      </footer>

      {/* User Auth Modal */}
      <UserAuthModal
        isOpen={isUserAuthModalOpen}
        onClose={() => setIsUserAuthModalOpen(false)}
        onSuccess={handleUserAuthSuccess}
      />

      {/* Feedback Modal */}
      <FeedbackModal
        isOpen={isFeedbackOpen}
        onClose={() => setIsFeedbackOpen(false)}
        currentUser={currentUser}
        onOpenAuth={() => setIsUserAuthModalOpen(true)}
      />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
