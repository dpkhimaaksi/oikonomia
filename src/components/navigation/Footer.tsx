import React from 'react';

interface FooterProps {
  onNavigateToCategory: (category: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateToCategory }) => {
  return (
    <footer className="border-t border-slate-200 bg-white py-10 no-print">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-slate-500">
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
          <span className="font-bold text-slate-900 text-sm">Oikonomia</span>
          <span className="hidden sm:inline" aria-hidden="true">·</span>
          <span>Platform Bank Materi & Alat Bantu Belajar Interaktif</span>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6 text-slate-600 font-medium">
          <button
            onClick={() => onNavigateToCategory('akuntansi')}
            className="hover:text-slate-900 transition-colors"
          >
            Modul Akuntansi
          </button>
          <button
            onClick={() => onNavigateToCategory('mikro')}
            className="hover:text-slate-900 transition-colors"
          >
            Modul Ekonomi Mikro
          </button>
          <button
            onClick={() => onNavigateToCategory('makro')}
            className="hover:text-slate-900 transition-colors"
          >
            Modul Ekonomi Makro
          </button>
        </div>

        <div className="text-slate-400 text-center sm:text-right">
          © {new Date().getFullYear()} Oikonomia. Bahasa Indonesia & Kurikulum Standar.
        </div>
      </div>
    </footer>
  );
};
