import React from 'react';
import { Newspaper, Calendar, Eye, ArrowRight, FileText, FileSpreadsheet } from 'lucide-react';
import { MaterialNewsItem, User } from '../../types/database';
import { EmptyState } from '../common/EmptyState';

interface NewsListViewProps {
  newsList: MaterialNewsItem[];
  currentUser: User | null;
  onSelectNews: (item: MaterialNewsItem) => void;
  onGoToDashboard: () => void;
}

export const NewsListView: React.FC<NewsListViewProps> = ({
  newsList,
  currentUser,
  onSelectNews,
  onGoToDashboard,
}) => {
  return (
    <div className="space-y-8">
      {/* Editorial Header */}
      <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xs space-y-3 transition-colors">
        <div className="text-2xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
          Warta & Informasi Terkini
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
          Berita & Pengumuman Ekonomi
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl">
          Informasi dinamika perekonomian nasional, pembaruan standar akuntansi, serta agenda akademik yang dikurasi oleh tim moderator Oikonomia.
        </p>
      </div>

      {/* Content or Clean Empty State */}
      {newsList.length === 0 ? (
        <EmptyState
          type="berita"
          userRole={currentUser?.role}
          onGoToDashboard={onGoToDashboard}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {newsList.map((item) => (
            <div
              key={item.id}
              onClick={() => onSelectNews(item)}
              className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-2xs hover:border-slate-400 dark:hover:border-slate-700 hover:shadow-xs transition-all cursor-pointer flex flex-col justify-between space-y-4 group"
            >
              <div className="space-y-3">
                {/* Zero-Pill Metadata */}
                <div className="flex items-center gap-2 text-2xs text-slate-500 dark:text-slate-400 font-medium">
                  <span>Oleh: {item.authorName}</span>
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
                <span className="text-2xs text-slate-400 dark:text-slate-500 font-normal">Publikasi Resmi</span>
                <span className="flex items-center gap-1 text-sky-700 dark:text-sky-400 group-hover:translate-x-1 transition-transform">
                  <span>Baca Selengkapnya</span>
                  <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
