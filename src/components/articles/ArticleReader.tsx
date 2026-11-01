import React, { useState } from 'react';
import { ArrowLeft, BookOpen, Calculator, MapPin, Table, CheckCircle2, XCircle, HelpCircle, ChevronRight, AlertCircle } from 'lucide-react';
import { Article, CategoryId, GlossaryTerm } from '../../types';
import { GLOSSARY } from '../../data/glossary';

interface ArticleReaderProps {
  article: Article;
  onBack: () => void;
  onSelectTerm: (term: GlossaryTerm) => void;
  onNavigateToSimulator?: (type: string) => void;
}

export const ArticleReader: React.FC<ArticleReaderProps> = ({
  article,
  onBack,
  onSelectTerm,
  onNavigateToSimulator,
}) => {
  // Quiz state for practice questions inside article
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showExplanations, setShowExplanations] = useState<Record<number, boolean>>({});

  const handleSelectAnswer = (qIndex: number, optionIndex: number) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [qIndex]: optionIndex,
    }));
    setShowExplanations((prev) => ({
      ...prev,
      [qIndex]: true,
    }));
  };

  // Helper to find related glossary term
  const findTerm = (termWord: string) => {
    return GLOSSARY.find(
      (g) => g.term.toLowerCase().includes(termWord.toLowerCase()) ||
             (g.originalTerm && g.originalTerm.toLowerCase().includes(termWord.toLowerCase()))
    );
  };

  const categoryName = 
    article.categoryId === 'akuntansi' ? 'Akuntansi' :
    article.categoryId === 'mikro' ? 'Ekonomi Mikro' : 'Ekonomi Makro';

  return (
    <article className="max-w-4xl mx-auto space-y-8 pb-16">
      {/* Top Breadcrumb Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 transition-colors py-1 px-2.5 rounded-md hover:bg-slate-100"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Daftar Materi</span>
        </button>

        {/* Zero-Pill Metadata */}
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <span>{categoryName}</span>
          <span aria-hidden="true">·</span>
          <span>Tingkat: {article.difficulty}</span>
          <span aria-hidden="true">·</span>
          <span>{article.readTime} baca</span>
        </div>
      </div>

      {/* Main Title & Intro Header */}
      <div className="space-y-4 border-b border-slate-200 pb-6">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
          {article.title}
        </h1>
        <p className="text-base text-slate-700 leading-relaxed font-normal">
          {article.intro}
        </p>
      </div>

      {/* 1. Pendahuluan & Konsep Utama */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-sm font-bold text-slate-900 uppercase tracking-wide">
          <span className="w-1.5 h-4 bg-sky-600 inline-block rounded-xs"></span>
          <span>1. Pendahuluan & Konsep Utama</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {article.conceptPoints.map((point, idx) => (
            <div key={idx} className="p-4 bg-white border border-slate-200 rounded-lg space-y-1.5">
              <h3 className="text-sm font-bold text-slate-900">{point.heading}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{point.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 2. Rumus & Formulasi Matematis */}
      {article.formulas && article.formulas.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-sm font-bold text-slate-900 uppercase tracking-wide">
            <span className="w-1.5 h-4 bg-emerald-600 inline-block rounded-xs"></span>
            <span>2. Rumus & Formulasi Matematis</span>
          </div>

          <div className="space-y-4">
            {article.formulas.map((form, idx) => (
              <div key={idx} className="p-5 bg-slate-900 text-slate-100 rounded-xl space-y-3">
                <div className="flex items-center justify-between text-xs border-b border-slate-800 pb-2">
                  <span className="font-semibold text-emerald-400 flex items-center gap-1.5">
                    <Calculator className="w-4 h-4" />
                    <span>{form.name}</span>
                  </span>
                  <span className="text-slate-400 font-mono">Formulasi Standar</span>
                </div>

                <div className="p-3 bg-slate-800/80 rounded-lg text-center font-mono text-base font-semibold text-white tracking-wide overflow-x-auto">
                  {form.formula}
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {form.description}
                </p>

                {form.variables && form.variables.length > 0 && (
                  <div className="pt-2 border-t border-slate-800/80 space-y-1">
                    <span className="text-2xs uppercase text-slate-400 font-bold block">Keterangan Variabel:</span>
                    <ul className="text-xs space-y-1 text-slate-300 font-normal">
                      {form.variables.map((v, vIdx) => (
                        <li key={vIdx} className="flex items-start gap-2">
                          <code className="text-emerald-300 font-mono font-semibold">{v.symbol}</code>
                          <span className="text-slate-400">=</span>
                          <span className="text-slate-300">{v.meaning}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 3. Contoh Kasus Nyata di Indonesia */}
      {article.caseStudy && (
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-sm font-bold text-slate-900 uppercase tracking-wide">
            <span className="w-1.5 h-4 bg-amber-600 inline-block rounded-xs"></span>
            <span>3. Contoh Kasus Nyata di Indonesia</span>
          </div>

          <div className="p-5 bg-amber-50/50 border border-amber-200/80 rounded-xl space-y-4">
            <div className="flex items-start gap-2.5">
              <MapPin className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
              <div>
                <h3 className="text-base font-bold text-amber-950">{article.caseStudy.title}</h3>
                <p className="text-xs text-amber-900/90 leading-relaxed mt-1">
                  {article.caseStudy.context}
                </p>
              </div>
            </div>

            <div className="space-y-2 pt-2 border-t border-amber-200/60">
              <span className="text-xs font-bold text-amber-950 uppercase tracking-wider block">
                Langkah Analisis & Perhitungan Sistematis:
              </span>
              <div className="space-y-1.5">
                {article.caseStudy.solutionSteps.map((step, sIdx) => (
                  <div key={sIdx} className="flex items-start gap-2 text-xs text-slate-800 bg-white/80 p-2.5 rounded border border-amber-100">
                    <span className="font-bold text-amber-700 shrink-0">#{sIdx + 1}</span>
                    <span className="leading-relaxed">{step}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-3 bg-amber-100/70 rounded-lg text-xs font-semibold text-amber-950 flex items-center gap-2">
              <span>💡 Kesimpulan Praktis:</span>
              <span className="font-normal">{article.caseStudy.takeaway}</span>
            </div>
          </div>
        </section>
      )}

      {/* 4. Visualisasi / Ilustrasi Grafik / Tabel Konseptual */}
      {article.visualExplanation && (
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-sm font-bold text-slate-900 uppercase tracking-wide">
            <span className="w-1.5 h-4 bg-indigo-600 inline-block rounded-xs"></span>
            <span>4. Visualisasi & Tabel Konseptual</span>
          </div>

          <div className="p-5 bg-white border border-slate-200 rounded-xl space-y-3">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Table className="w-4 h-4 text-slate-500" />
              <span>{article.visualExplanation.title}</span>
            </h3>

            {article.visualExplanation.headers && article.visualExplanation.rows && (
              <div className="overflow-x-auto border border-slate-200 rounded-lg">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-700 uppercase font-semibold border-b border-slate-200">
                    <tr>
                      {article.visualExplanation.headers.map((hdr, hIdx) => (
                        <th key={hIdx} className="py-2.5 px-3">
                          {hdr}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {article.visualExplanation.rows.map((row, rIdx) => (
                      <tr key={rIdx} className="hover:bg-slate-50/80">
                        {row.map((cell, cIdx) => (
                          <td
                            key={cIdx}
                            className={`py-2.5 px-3 ${
                              cIdx === 0 ? 'font-medium text-slate-900' : 'text-slate-600'
                            }`}
                          >
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {article.visualExplanation.notes && (
              <p className="text-2xs text-slate-500 italic pt-1">
                {article.visualExplanation.notes}
              </p>
            )}
          </div>
        </section>
      )}

      {/* 5. Latihan Soal + Pembahasan Rinci */}
      {article.quiz && article.quiz.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-sm font-bold text-slate-900 uppercase tracking-wide">
            <span className="w-1.5 h-4 bg-emerald-600 inline-block rounded-xs"></span>
            <span>5. Latihan Soal & Pembahasan Rinci</span>
          </div>

          <div className="space-y-4">
            {article.quiz.map((q, qIdx) => {
              const selectedOpt = selectedAnswers[qIdx];
              const isAnswered = selectedOpt !== undefined;
              const isCorrect = isAnswered && selectedOpt === q.correctIndex;

              return (
                <div key={qIdx} className="p-5 bg-white border border-slate-200 rounded-xl space-y-4 shadow-2xs">
                  <div className="flex items-start gap-2.5">
                    <span className="w-6 h-6 rounded-full bg-slate-900 text-white text-xs font-bold flex items-center justify-center shrink-0">
                      {qIdx + 1}
                    </span>
                    <p className="text-sm font-semibold text-slate-900 leading-relaxed">
                      {q.question}
                    </p>
                  </div>

                  {/* Options */}
                  <div className="space-y-2 pl-8">
                    {q.options.map((opt, optIdx) => {
                      const isOptionSelected = selectedOpt === optIdx;
                      const isThisCorrect = optIdx === q.correctIndex;

                      let btnStyle = 'bg-white border-slate-200 text-slate-700 hover:border-slate-400 hover:bg-slate-50';
                      if (isAnswered) {
                        if (isThisCorrect) {
                          btnStyle = 'bg-emerald-50 border-emerald-500 text-emerald-950 font-semibold';
                        } else if (isOptionSelected) {
                          btnStyle = 'bg-rose-50 border-rose-500 text-rose-950 line-through';
                        } else {
                          btnStyle = 'bg-white border-slate-200 text-slate-400 opacity-60';
                        }
                      }

                      return (
                        <button
                          key={optIdx}
                          disabled={isAnswered}
                          onClick={() => handleSelectAnswer(qIdx, optIdx)}
                          className={`w-full text-left p-3 text-xs border rounded-lg transition-all flex items-center justify-between gap-3 ${btnStyle}`}
                        >
                          <div className="flex items-center gap-2.5">
                            <span className="font-mono font-bold text-slate-500 uppercase">
                              {String.fromCharCode(65 + optIdx)}.
                            </span>
                            <span>{opt}</span>
                          </div>
                          {isAnswered && isThisCorrect && (
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                          )}
                          {isAnswered && isOptionSelected && !isThisCorrect && (
                            <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Pembahasan Rinci */}
                  {showExplanations[qIdx] && (
                    <div className="mt-3 pl-8">
                      <div className={`p-4 rounded-lg text-xs space-y-1.5 ${isCorrect ? 'bg-emerald-50/80 border border-emerald-200 text-emerald-950' : 'bg-rose-50/80 border border-rose-200 text-rose-950'}`}>
                        <div className="flex items-center gap-2 font-bold">
                          {isCorrect ? (
                            <>
                              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                              <span>Jawaban Anda Benar!</span>
                            </>
                          ) : (
                            <>
                              <AlertCircle className="w-4 h-4 text-rose-600" />
                              <span>Jawaban Kurang Tepat — Kunci Jawaban: {String.fromCharCode(65 + q.correctIndex)}</span>
                            </>
                          )}
                        </div>
                        <p className="leading-relaxed text-slate-700 pt-1">
                          <strong>Pembahasan: </strong>{q.explanation}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Bottom Action Footer */}
      <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
        <button
          onClick={onBack}
          className="px-4 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
        >
          ← Kembali ke Katalog Pustaka
        </button>

        {onNavigateToSimulator && (
          <button
            onClick={() => onNavigateToSimulator(article.categoryId === 'mikro' ? 'market-equilibrium' : article.categoryId === 'akuntansi' ? 'trial-balance' : 'macro-multiplier')}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-medium text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <span>Buka Alat Simulasi Terkait</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </article>
  );
};
