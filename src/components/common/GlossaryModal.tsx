import React from 'react';
import { X, BookOpen, Layers } from 'lucide-react';
import { GlossaryTerm } from '../../types';

interface GlossaryModalProps {
  term: GlossaryTerm | null;
  onClose: () => void;
  onNavigateToTopic?: (category: string) => void;
}

export const GlossaryModal: React.FC<GlossaryModalProps> = ({ term, onClose, onNavigateToTopic }) => {
  if (!term) return null;

  const categoryLabel = 
    term.category === 'akuntansi' ? 'Akuntansi' :
    term.category === 'mikro' ? 'Ekonomi Mikro' : 'Ekonomi Makro';

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs transition-opacity"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-xl bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between p-6 border-b border-slate-100 bg-slate-50/50">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
              <span>{categoryLabel}</span>
              <span aria-hidden="true">·</span>
              <span>Glosarium Istilah</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900">{term.term}</h3>
            {term.originalTerm && (
              <p className="text-sm font-medium text-slate-500 italic mt-0.5">
                Istilah Asing: {term.originalTerm}
              </p>
            )}
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
            aria-label="Tutup"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
          {/* Definition */}
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
              Definisi Konseptual
            </div>
            <p className="text-sm leading-relaxed text-slate-700 font-normal">
              {term.definition}
            </p>
          </div>

          {/* Formula if available */}
          {term.formula && (
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg">
              <div className="text-xs font-semibold text-slate-600 mb-1 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-slate-500" />
                <span>Formulasi Matematis</span>
              </div>
              <div className="font-mono text-sm font-medium text-slate-900 bg-white p-2.5 rounded border border-slate-200 tabular-nums overflow-x-auto">
                {term.formula}
              </div>
            </div>
          )}

          {/* Contextual Example in Indonesia */}
          <div className="p-4 bg-amber-50/60 border border-amber-200/80 rounded-lg">
            <div className="text-xs font-semibold text-amber-900 mb-1 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-amber-700" />
              <span>Contoh Penerapan Nyata</span>
            </div>
            <p className="text-sm text-amber-950 leading-relaxed">
              {term.example}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-50 border-t border-slate-100 text-xs text-slate-500">
          <span>Kamus Resmi Edukasi Oikonomia</span>
          <div className="flex gap-2">
            {onNavigateToTopic && (
              <button
                onClick={() => {
                  onNavigateToTopic(term.category);
                  onClose();
                }}
                className="px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-md hover:bg-slate-50 transition-colors"
              >
                Lihat Modul {categoryLabel}
              </button>
            )}
            <button
              onClick={onClose}
              className="px-3 py-1.5 text-xs font-medium text-white bg-slate-900 rounded-md hover:bg-slate-800 transition-colors"
            >
              Tutup
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
