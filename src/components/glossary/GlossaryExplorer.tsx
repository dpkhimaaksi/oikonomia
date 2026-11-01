import React, { useState } from 'react';
import { Search, BookOpen, Layers } from 'lucide-react';
import { GLOSSARY } from '../../data/glossary';
import { CategoryId, GlossaryTerm } from '../../types';

interface GlossaryExplorerProps {
  onSelectTerm: (term: GlossaryTerm) => void;
}

export const GlossaryExplorer: React.FC<GlossaryExplorerProps> = ({ onSelectTerm }) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryId | 'all'>('all');

  const filteredGlossary = GLOSSARY.filter((item) => {
    const matchesCat = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesQuery =
      item.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.originalTerm && item.originalTerm.toLowerCase().includes(searchQuery.toLowerCase())) ||
      item.definition.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesQuery;
  });

  return (
    <div className="space-y-6">
      {/* Header and Filter */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-2xs space-y-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
            <span>Kamus Istilah Resmi</span>
            <span aria-hidden="true">·</span>
            <span>40+ Definisi & Kasus Nyata</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900">Glosarium Ekonomi & Akuntansi</h2>
          <p className="text-sm text-slate-500 mt-0.5">
            Jelajahi terminologi standar, konsep asing dalam tanda kurung, formulasi matematis, dan contoh penerapannya di Indonesia.
          </p>
        </div>

        {/* Search Bar & Filter Buttons */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-3 border-t border-slate-100">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari istilah (cth: Deadweight Loss, Amortisasi, MPC)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900 focus:bg-white"
            />
          </div>

          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                selectedCategory === 'all' ? 'bg-white text-slate-900 shadow-2xs font-semibold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Semua ({GLOSSARY.length})
            </button>
            <button
              onClick={() => setSelectedCategory('akuntansi')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                selectedCategory === 'akuntansi' ? 'bg-white text-slate-900 shadow-2xs font-semibold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Akuntansi
            </button>
            <button
              onClick={() => setSelectedCategory('mikro')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                selectedCategory === 'mikro' ? 'bg-white text-slate-900 shadow-2xs font-semibold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Mikro
            </button>
            <button
              onClick={() => setSelectedCategory('makro')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                selectedCategory === 'makro' ? 'bg-white text-slate-900 shadow-2xs font-semibold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Makro
            </button>
          </div>
        </div>
      </div>

      {/* Grid of Glossary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredGlossary.map((item) => {
          const categoryBadge = 
            item.category === 'akuntansi' ? 'Akuntansi' :
            item.category === 'mikro' ? 'Ekonomi Mikro' : 'Ekonomi Makro';

          return (
            <div
              key={item.id}
              onClick={() => onSelectTerm(item)}
              className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs hover:border-slate-400 hover:shadow-xs transition-all cursor-pointer flex flex-col justify-between space-y-4 group"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between text-2xs text-slate-500">
                  <span className="font-semibold uppercase tracking-wider">{categoryBadge}</span>
                  <span className="text-slate-400 group-hover:text-slate-900 transition-colors">Buka Detail →</span>
                </div>

                <h3 className="text-base font-bold text-slate-900 group-hover:text-sky-700 transition-colors">
                  {item.term}
                </h3>
                {item.originalTerm && (
                  <p className="text-xs text-slate-500 italic">
                    ({item.originalTerm})
                  </p>
                )}

                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                  {item.definition}
                </p>
              </div>

              {item.formula && (
                <div className="p-2.5 bg-slate-50 rounded border border-slate-200 font-mono text-2xs text-slate-800 truncate tabular-nums">
                  {item.formula}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {filteredGlossary.length === 0 && (
        <div className="text-center py-12 bg-white rounded-xl border border-slate-200 p-8 space-y-2">
          <p className="text-sm font-semibold text-slate-900">Istilah tidak ditemukan</p>
          <p className="text-xs text-slate-500">
            Tidak ada istilah yang cocok dengan kata kunci "{searchQuery}". Silakan coba kata kunci lain.
          </p>
        </div>
      )}
    </div>
  );
};
