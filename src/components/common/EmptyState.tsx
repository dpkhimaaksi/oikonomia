import React from 'react';
import { Newspaper, BookOpen, PlusCircle, ShieldAlert } from 'lucide-react';
import { UserRole } from '../../types/database';

interface EmptyStateProps {
  type: 'berita' | 'materi';
  userRole?: UserRole;
  onGoToDashboard?: () => void;
  categoryFilter?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  type,
  userRole,
  onGoToDashboard,
  categoryFilter,
}) => {
  const isModerator = userRole === 'moderator';

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 sm:p-12 text-center max-w-xl mx-auto shadow-2xs space-y-5 transition-colors">
      <div className="w-14 h-14 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full flex items-center justify-center mx-auto text-slate-400 dark:text-slate-500">
        {type === 'berita' ? (
          <Newspaper className="w-7 h-7" />
        ) : (
          <BookOpen className="w-7 h-7" />
        )}
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white">
          {type === 'berita'
            ? 'Belum Ada Berita yang Diterbitkan'
            : categoryFilter
            ? `Belum Ada Materi untuk Kategori ${categoryFilter.toUpperCase()}`
            : 'Belum Ada Materi Pelajaran yang Diterbitkan'}
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed max-w-md mx-auto">
          {type === 'berita'
            ? 'Basis data saat ini dalam kondisi awal (empty state). Berita terkini seputar ekonomi dan kebijakan akan muncul di sini segera setelah ditambahkan oleh moderator.'
            : 'Pustaka materi Akuntansi, Ekonomi Mikro, dan Ekonomi Makro akan terisi secara dinamis melalui unggahan materi dan berkas dari moderator.'}
        </p>
      </div>

      {isModerator && onGoToDashboard && (
        <div className="pt-2">
          <button
            onClick={onGoToDashboard}
            className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-slate-900 dark:bg-sky-600 hover:bg-slate-800 dark:hover:bg-sky-500 rounded-lg transition-colors shadow-2xs"
          >
            <PlusCircle className="w-4 h-4 text-emerald-400 dark:text-emerald-300" />
            <span>Tambah {type === 'berita' ? 'Berita' : 'Materi'} via Dashboard</span>
          </button>
        </div>
      )}

      {!isModerator && (
        <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-lg text-2xs text-slate-500 dark:text-slate-400 border border-slate-100 dark:border-slate-800 flex items-center justify-center gap-2">
          <ShieldAlert className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span>Pengelolaan konten materi & berita dilakukan secara eksklusif oleh Moderator.</span>
        </div>
      )}
    </div>
  );
};
