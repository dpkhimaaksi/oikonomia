import React from 'react';
import { User } from '../../types/database';
import { ShieldCheck, LogOut, MessageSquare, Shield, LogIn, User as UserIcon } from 'lucide-react';
import { ThemeToggle } from '../common/ThemeToggle';

export type MainNavTab = 'berita' | 'materi' | 'dashboard';

interface HeaderProps {
  activeTab: MainNavTab;
  onSelectTab: (tab: MainNavTab) => void;
  currentUser: User | null;
  onOpenFeedback: () => void;
  onLogout: () => void;
  onOpenAuth: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onSelectTab,
  currentUser,
  onOpenFeedback,
  onLogout,
  onOpenAuth,
}) => {
  const isModerator = currentUser?.role === 'moderator';

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xs border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4 sm:gap-8">
        {/* Zone 1: Logo & Brand Wordmark */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => onSelectTab('berita')}
            className="flex items-center gap-2.5 text-xl font-bold tracking-tight text-slate-900 dark:text-white whitespace-nowrap hover:opacity-90 transition-opacity"
            title="Oikonomia — Halaman Utama"
          >
            <img
              src="/OIKONOMIA.png"
              alt="Oikonomia Logo"
              className="w-8 h-8 rounded-lg object-contain bg-white dark:bg-slate-800 p-0.5 border border-slate-200 dark:border-slate-700 shadow-2xs"
            />
            <span className="font-extrabold tracking-tight">Oikonomia</span>
          </button>
        </div>

        {/* Zone 2: Navigation Links (single line, role-based) */}
        <nav className="flex items-center gap-4 sm:gap-8 text-sm font-medium text-slate-600 dark:text-slate-400">
          <button
            onClick={() => onSelectTab('berita')}
            className={`whitespace-nowrap transition-colors py-1 ${
              activeTab === 'berita'
                ? 'text-slate-950 dark:text-white font-bold border-b-2 border-slate-900 dark:border-sky-400'
                : 'hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Berita
          </button>

          <button
            onClick={() => onSelectTab('materi')}
            className={`whitespace-nowrap transition-colors py-1 ${
              activeTab === 'materi'
                ? 'text-slate-950 dark:text-white font-bold border-b-2 border-slate-900 dark:border-sky-400'
                : 'hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Materi
          </button>

          <button
            onClick={onOpenFeedback}
            className="whitespace-nowrap hover:text-slate-900 dark:hover:text-white transition-colors py-1 flex items-center gap-1.5"
          >
            <MessageSquare className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
            <span>Kirim Masukan</span>
          </button>

          {/* Exclusive Moderator Dashboard Tab (Shown only when logged in as Moderator) */}
          {isModerator && (
            <button
              onClick={() => onSelectTab('dashboard')}
              className={`whitespace-nowrap transition-colors py-1 flex items-center gap-1.5 ${
                activeTab === 'dashboard'
                  ? 'text-sky-950 dark:text-sky-300 font-bold border-b-2 border-sky-800 dark:border-sky-400'
                  : 'text-sky-700 dark:text-sky-400 hover:text-sky-950 dark:hover:text-sky-300 font-semibold'
              }`}
            >
              <ShieldCheck className="w-4 h-4 text-sky-700 dark:text-sky-400" />
              <span>Dashboard</span>
            </button>
          )}
        </nav>

        {/* Zone 3: Dark Mode Toggle & User Auth */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* Theme Toggle Button */}
          <ThemeToggle />

          {currentUser ? (
            <div className="flex items-center gap-2.5 sm:gap-3 pl-1 border-l border-slate-200 dark:border-slate-800">
              <div className="text-right hidden sm:block">
                <div className="text-xs font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1 justify-end">
                  {currentUser.role === 'moderator' ? (
                    <span className="text-2xs font-bold text-sky-800 dark:text-sky-400 flex items-center gap-0.5">
                      <Shield className="w-3 h-3 text-sky-700 dark:text-sky-400" />
                      <span>[Moderator]</span>
                    </span>
                  ) : (
                    <span className="text-2xs font-medium text-slate-500 dark:text-slate-400 flex items-center gap-0.5">
                      <UserIcon className="w-3 h-3 text-slate-400" />
                      <span>[User]</span>
                    </span>
                  )}
                  <span>{currentUser.fullName || currentUser.username}</span>
                </div>
                <div className="text-2xs text-slate-400 dark:text-slate-500 font-mono">
                  @{currentUser.username}
                </div>
              </div>

              <button
                onClick={onLogout}
                title="Keluar dari akun"
                className="p-1.5 text-slate-500 dark:text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors flex items-center gap-1 text-xs"
                aria-label="Logout"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Keluar</span>
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenAuth}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-slate-900 dark:text-slate-100 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-300 dark:border-slate-700 rounded-lg transition-colors shadow-2xs"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Masuk / Daftar</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
