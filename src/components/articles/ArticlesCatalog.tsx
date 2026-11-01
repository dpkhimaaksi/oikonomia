import React, { useState } from 'react';
import { ArrowRight, BookOpen, Layers, CheckCircle2, ChevronRight } from 'lucide-react';
import { CATEGORIES, TOPICS } from '../../data/categories';
import { ARTICLES } from '../../data/articles';
import { Article, CategoryId } from '../../types';

interface ArticlesCatalogProps {
  onSelectArticle: (article: Article) => void;
  selectedCategory: CategoryId | 'all';
  onSelectCategory: (cat: CategoryId | 'all') => void;
}

export const ArticlesCatalog: React.FC<ArticlesCatalogProps> = ({
  onSelectArticle,
  selectedCategory,
  onSelectCategory,
}) => {
  const [selectedTopicId, setSelectedTopicId] = useState<string | 'all'>('all');

  const filteredArticles = ARTICLES.filter((art) => {
    const matchCat = selectedCategory === 'all' || art.categoryId === selectedCategory;
    const matchTopic = selectedTopicId === 'all' || art.topicId === selectedTopicId;
    return matchCat && matchTopic;
  });

  const availableTopics = TOPICS.filter(
    (t) => selectedCategory === 'all' || t.categoryId === selectedCategory
  );

  return (
    <div className="space-y-8">
      {/* Editorial Hero Banner */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
        <div className="max-w-2xl space-y-2">
          <div className="text-2xs font-bold uppercase tracking-wider text-slate-400">
            Pusat Pustaka Materi & Pengetahuan
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Pustaka Lengkap Akuntansi, Ekonomi Mikro, & Makro
          </h1>
          <p className="text-sm text-slate-600 leading-relaxed">
            Materi terstruktur berbasis kurikulum perguruan tinggi & UTBK: konsep dasar, formulasi matematis, studi kasus nyata dunia usaha di Indonesia, dan latihan soal interaktif.
          </p>
        </div>

        {/* Category Filter Tabs (Interactive Segmented Buttons) */}
        <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-slate-100">
          <button
            onClick={() => {
              onSelectCategory('all');
              setSelectedTopicId('all');
            }}
            className={`px-4 py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
              selectedCategory === 'all'
                ? 'bg-slate-900 text-white font-semibold shadow-2xs'
                : 'bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200'
            }`}
          >
            Semua Modul
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                onSelectCategory(cat.id);
                setSelectedTopicId('all');
              }}
              className={`px-4 py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                selectedCategory === cat.id
                  ? 'bg-slate-900 text-white font-semibold shadow-2xs'
                  : 'bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Module Overview Cards if 'all' is selected */}
      {selectedCategory === 'all' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className="bg-white p-6 rounded-xl border border-slate-200 shadow-2xs hover:border-slate-400 hover:shadow-xs transition-all cursor-pointer flex flex-col justify-between space-y-4 group"
            >
              <div className="space-y-2">
                <span className="text-2xs font-bold uppercase tracking-wider text-slate-400 block">
                  {cat.badgeLabel}
                </span>
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-sky-700 transition-colors">
                  {cat.name}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {cat.description}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-medium text-slate-700 group-hover:text-slate-900">
                <span>Eksplorasi Modul</span>
                <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Topic Filter Pills if category selected */}
      {selectedCategory !== 'all' && availableTopics.length > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-2xs font-bold uppercase text-slate-400 mr-2">Topik Khusus:</span>
          <button
            onClick={() => setSelectedTopicId('all')}
            className={`px-3 py-1.5 text-xs rounded-md transition-colors ${
              selectedTopicId === 'all'
                ? 'bg-slate-900 text-white font-semibold'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            Semua Topik
          </button>
          {availableTopics.map((top) => (
            <button
              key={top.id}
              onClick={() => setSelectedTopicId(top.id)}
              className={`px-3 py-1.5 text-xs rounded-md transition-colors ${
                selectedTopicId === top.id
                  ? 'bg-slate-900 text-white font-semibold'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {top.title}
            </button>
          ))}
        </div>
      )}

      {/* Articles Cards Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-slate-900">
            Koleksi Artikel Pustaka ({filteredArticles.length} Materi)
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredArticles.map((art) => {
            const catLabel =
              art.categoryId === 'akuntansi' ? 'Akuntansi' :
              art.categoryId === 'mikro' ? 'Ekonomi Mikro' : 'Ekonomi Makro';

            return (
              <div
                key={art.id}
                onClick={() => onSelectArticle(art)}
                className="bg-white p-6 rounded-xl border border-slate-200 shadow-2xs hover:border-slate-400 hover:shadow-xs transition-all cursor-pointer flex flex-col justify-between space-y-5 group"
              >
                <div className="space-y-3">
                  {/* Zero-Pill Metadata */}
                  <div className="flex items-center gap-2 text-2xs text-slate-500 font-medium">
                    <span>{catLabel}</span>
                    <span aria-hidden="true">·</span>
                    <span>Tingkat {art.difficulty}</span>
                    <span aria-hidden="true">·</span>
                    <span>{art.readTime} baca</span>
                  </div>

                  {/* Title & Excerpt */}
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-sky-700 transition-colors leading-snug">
                    {art.title}
                  </h3>
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {art.intro}
                  </p>

                  {/* Highlights preview */}
                  {art.formulas && art.formulas.length > 0 && (
                    <div className="p-2.5 bg-slate-50 rounded border border-slate-100 font-mono text-2xs text-slate-700 truncate tabular-nums">
                      Formulasi: {art.formulas[0].formula}
                    </div>
                  )}
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-900">
                  <span className="flex items-center gap-1.5 text-slate-500 font-normal">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Latihan Soal & Pembahasan</span>
                  </span>
                  <span className="flex items-center gap-1 text-sky-700 group-hover:translate-x-1 transition-transform">
                    <span>Baca Materi</span>
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
