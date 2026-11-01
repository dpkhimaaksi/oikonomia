import React, { useState } from 'react';
import { BookOpen, Calendar, Eye, ArrowRight, FileText, FileSpreadsheet } from 'lucide-react';
import { MaterialNewsItem, MateriCategory, User } from '../../types/database';
import { EmptyState } from '../common/EmptyState';

interface MaterialsListViewProps {
  materialsList: MaterialNewsItem[];
  currentUser: User | null;
  onSelectMaterial: (item: MaterialNewsItem) => void;
  onGoToDashboard: () => void;
}

export const MaterialsListView: React.FC<MaterialsListViewProps> = ({
  materialsList,
  currentUser,
  onSelectMaterial,
  onGoToDashboard,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<MateriCategory | 'semua'>('semua');

  const filtered = materialsList.filter((item) => {
    if (selectedCategory === 'semua') return true;
    return item.category === selectedCategory;
  });

  return (
    <div className="space-y-8">
      {/* Editorial Header */}
      <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xs space-y-4 transition-colors">
        <div className="max-w-2xl space-y-2">
          <div className="text-2xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
            Bank Materi & Kurikulum Interaktif
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
            Pusat Materi Pelajaran Ekonomi & Bisnis
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            Eksplorasi materi terstruktur dari tiga pilar utama: Akuntansi, Ekonomi Mikro, dan Ekonomi Makro, lengkap dengan modul lampiran siap unduh.
          </p>
        </div>

        {/* Category Segmented Controls */}
        <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
          <button
            onClick={() => setSelectedCategory('semua')}
            className={`px-4 py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
              selectedCategory === 'semua'
                ? 'bg-slate-900 dark:bg-sky-600 text-white font-semibold shadow-2xs'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            Semua Modul ({materialsList.length})
          </button>
          <button
            onClick={() => setSelectedCategory('akuntansi')}
            className={`px-4 py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
              selectedCategory === 'akuntansi'
                ? 'bg-slate-900 dark:bg-sky-600 text-white font-semibold shadow-2xs'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            Akuntansi ({materialsList.filter((m) => m.category === 'akuntansi').length})
          </button>
          <button
            onClick={() => setSelectedCategory('mikro')}
            className={`px-4 py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
              selectedCategory === 'mikro'
                ? 'bg-slate-900 dark:bg-sky-600 text-white font-semibold shadow-2xs'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            Ekonomi Mikro ({materialsList.filter((m) => m.category === 'mikro').length})
          </button>
          <button
            onClick={() => setSelectedCategory('makro')}
            className={`px-4 py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
              selectedCategory === 'makro'
                ? 'bg-slate-900 dark:bg-sky-600 text-white font-semibold shadow-2xs'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            Ekonomi Makro ({materialsList.filter((m) => m.category === 'makro').length})
          </button>
        </div>
      </div>

      {/* Content or Clean Empty State */}
      {filtered.length === 0 ? (
        <EmptyState
          type="materi"
          categoryFilter={selectedCategory === 'semua' ? undefined : selectedCategory}
          userRole={currentUser?.role}
          onGoToDashboard={onGoToDashboard}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filtered.map((item) => {
            const catLabel =
              item.category === 'akuntansi' ? 'Akuntansi' :
              item.category === 'mikro' ? 'Ekonomi Mikro' : 'Ekonomi Makro';

            return (
              <div
                key={item.id}
                onClick={() => onSelectMaterial(item)}
                className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-2xs hover:border-slate-400 dark:hover:border-slate-700 hover:shadow-xs transition-all cursor-pointer flex flex-col justify-between space-y-4 group"
              >
                <div className="space-y-3">
                  {/* Zero-Pill Metadata */}
                  <div className="flex items-center gap-2 text-2xs text-slate-500 dark:text-slate-400 font-medium">
                    <span>Modul: {catLabel}</span>
                    <span aria-hidden="true">·</span>
                    <span>{new Date(item.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                    <span aria-hidden="true">·</span>
                    <span className="flex items-center gap-1">
                      <Eye className="w-3 h-3 text-slate-400 dark:text-slate-500" />
                      <span className="font-mono tabular-nums">{item.viewsCount} views</span>
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-sky-700 dark:group-hover:text-sky-400 transition-colors leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed">
                    {item.summary}
                  </p>

                  {item.attachment && (
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-2xs text-slate-700 dark:text-slate-300 font-mono">
                      {item.attachment.name.endsWith('.xlsx') ? (
                        <FileSpreadsheet className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                      ) : (
                        <FileText className="w-3 h-3 text-sky-700 dark:text-sky-400" />
                      )}
                      <span className="truncate max-w-[200px]">{item.attachment.name}</span>
                    </div>
                  )}
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-semibold text-slate-900 dark:text-slate-200">
                  <span className="text-2xs text-slate-400 dark:text-slate-500 font-normal">Materi Kurikulum</span>
                  <span className="flex items-center gap-1 text-sky-700 dark:text-sky-400 group-hover:translate-x-1 transition-transform">
                    <span>Pelajari Materi</span>
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
