import React, { useState, useEffect, useRef } from 'react';
import { Search, X, BookOpen, Calculator, FileText, ArrowRight } from 'lucide-react';
import { ARTICLES } from '../../data/articles';
import { SIMULATORS_LIST } from '../../data/simulators';
import { GLOSSARY } from '../../data/glossary';
import { Article, SimulatorInfo, GlossaryTerm } from '../../types';

interface QuickSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectArticle: (article: Article) => void;
  onSelectSimulator: (sim: SimulatorInfo) => void;
  onSelectTerm: (term: GlossaryTerm) => void;
}

export const QuickSearchModal: React.FC<QuickSearchModalProps> = ({
  isOpen,
  onClose,
  onSelectArticle,
  onSelectSimulator,
  onSelectTerm,
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const trimmed = query.trim().toLowerCase();

  const matchedArticles = trimmed
    ? ARTICLES.filter(
        (a) =>
          a.title.toLowerCase().includes(trimmed) ||
          a.intro.toLowerCase().includes(trimmed) ||
          a.conceptPoints.some((c) => c.heading.toLowerCase().includes(trimmed))
      )
    : [];

  const matchedSimulators = trimmed
    ? SIMULATORS_LIST.filter(
        (s) =>
          s.title.toLowerCase().includes(trimmed) ||
          s.description.toLowerCase().includes(trimmed) ||
          s.parameters.some((p) => p.toLowerCase().includes(trimmed))
      )
    : [];

  const matchedGlossary = trimmed
    ? GLOSSARY.filter(
        (g) =>
          g.term.toLowerCase().includes(trimmed) ||
          (g.originalTerm && g.originalTerm.toLowerCase().includes(trimmed)) ||
          g.definition.toLowerCase().includes(trimmed)
      )
    : [];

  const totalResults = matchedArticles.length + matchedSimulators.length + matchedGlossary.length;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-16 sm:pt-24 bg-slate-900/60 backdrop-blur-xs transition-opacity"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-slate-100 bg-slate-50/50">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Cari materi, rumus, alat simulator, atau istilah glosarium..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full text-sm bg-transparent border-none focus:outline-none text-slate-900 placeholder:text-slate-400 font-normal"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-slate-400 hover:text-slate-700 rounded"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-block px-2 py-0.5 text-2xs font-mono font-medium text-slate-400 bg-slate-100 border border-slate-200 rounded">
            ESC
          </kbd>
        </div>

        {/* Results Area */}
        <div className="p-4 overflow-y-auto space-y-5 flex-1">
          {query.trim() === '' ? (
            <div className="text-center py-10 space-y-3 text-slate-500">
              <BookOpen className="w-8 h-8 mx-auto text-slate-300" />
              <div className="text-xs">
                Ketikkan kata kunci seperti <code className="bg-slate-100 px-1 py-0.5 rounded text-slate-700">BEP</code>,{' '}
                <code className="bg-slate-100 px-1 py-0.5 rounded text-slate-700">PDB</code>,{' '}
                <code className="bg-slate-100 px-1 py-0.5 rounded text-slate-700">Deadweight Loss</code>, atau{' '}
                <code className="bg-slate-100 px-1 py-0.5 rounded text-slate-700">Depresiasi</code>.
              </div>
            </div>
          ) : totalResults === 0 ? (
            <div className="text-center py-10 text-xs text-slate-500">
              Tidak ditemukan hasil untuk "{query}". Coba periksa ejaan atau gunakan istilah lain.
            </div>
          ) : (
            <>
              {/* Articles */}
              {matchedArticles.length > 0 && (
                <div className="space-y-2">
                  <div className="text-2xs font-bold uppercase tracking-wider text-slate-400 px-2">
                    Artikel & Pustaka Materi ({matchedArticles.length})
                  </div>
                  <div className="space-y-1">
                    {matchedArticles.map((art) => (
                      <div
                        key={art.id}
                        onClick={() => {
                          onSelectArticle(art);
                          onClose();
                        }}
                        className="p-3 rounded-lg hover:bg-slate-100 cursor-pointer transition-colors flex items-center justify-between group"
                      >
                        <div className="space-y-0.5">
                          <div className="text-xs font-semibold text-slate-900 group-hover:text-sky-700 transition-colors">
                            {art.title}
                          </div>
                          <div className="text-2xs text-slate-500 line-clamp-1">
                            {art.intro}
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-slate-900 transition-colors shrink-0 ml-2" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Simulators */}
              {matchedSimulators.length > 0 && (
                <div className="space-y-2">
                  <div className="text-2xs font-bold uppercase tracking-wider text-slate-400 px-2">
                    Alat Simulator Interaktif ({matchedSimulators.length})
                  </div>
                  <div className="space-y-1">
                    {matchedSimulators.map((sim) => (
                      <div
                        key={sim.id}
                        onClick={() => {
                          onSelectSimulator(sim);
                          onClose();
                        }}
                        className="p-3 rounded-lg hover:bg-slate-100 cursor-pointer transition-colors flex items-center justify-between group"
                      >
                        <div className="space-y-0.5">
                          <div className="text-xs font-semibold text-slate-900 group-hover:text-emerald-700 transition-colors flex items-center gap-1.5">
                            <Calculator className="w-3.5 h-3.5 text-emerald-600" />
                            <span>{sim.title}</span>
                          </div>
                          <div className="text-2xs text-slate-500 line-clamp-1">
                            {sim.description}
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-slate-900 transition-colors shrink-0 ml-2" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Glossary */}
              {matchedGlossary.length > 0 && (
                <div className="space-y-2">
                  <div className="text-2xs font-bold uppercase tracking-wider text-slate-400 px-2">
                    Istilah Glosarium ({matchedGlossary.length})
                  </div>
                  <div className="space-y-1">
                    {matchedGlossary.map((term) => (
                      <div
                        key={term.id}
                        onClick={() => {
                          onSelectTerm(term);
                          onClose();
                        }}
                        className="p-3 rounded-lg hover:bg-slate-100 cursor-pointer transition-colors flex items-center justify-between group"
                      >
                        <div className="space-y-0.5">
                          <div className="text-xs font-semibold text-slate-900 group-hover:text-amber-700 transition-colors">
                            {term.term} {term.originalTerm && <span className="font-normal text-slate-500">({term.originalTerm})</span>}
                          </div>
                          <div className="text-2xs text-slate-500 line-clamp-1">
                            {term.definition}
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-slate-900 transition-colors shrink-0 ml-2" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-2.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-2xs text-slate-400">
          <span>Gunakan panah untuk navigasi</span>
          <span>Tekan ESC untuk menutup</span>
        </div>
      </div>
    </div>
  );
};
