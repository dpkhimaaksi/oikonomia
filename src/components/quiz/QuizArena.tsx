import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Award, CheckCircle2, XCircle, RotateCcw, ChevronRight, HelpCircle } from 'lucide-react';
import { QUIZ_BANK } from '../../data/quizzes';
import { CategoryId, QuizQuestionItem } from '../../types';

export const QuizArena: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryId | 'all'>('all');
  const [selectedLevel, setSelectedLevel] = useState<'all' | 'SMA/UTBK' | 'Kuliah S1' | 'Praktisi'>('all');

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  // Filtered quiz questions
  const filteredQuestions = QUIZ_BANK.filter((q) => {
    const matchCat = selectedCategory === 'all' || q.categoryId === selectedCategory;
    const matchLevel = selectedLevel === 'all' || q.targetAudience === selectedLevel;
    return matchCat && matchLevel;
  });

  const currentQ: QuizQuestionItem | undefined = filteredQuestions[currentIndex];

  const handleSelectAnswer = (optionIdx: number) => {
    if (userAnswers[currentIndex] !== undefined) return;

    const updatedAnswers = {
      ...userAnswers,
      [currentIndex]: optionIdx,
    };
    setUserAnswers(updatedAnswers);

    // If last question, finish
    if (currentIndex === filteredQuestions.length - 1) {
      setTimeout(() => {
        setIsCompleted(true);
        // Calculate score
        let score = 0;
        filteredQuestions.forEach((q, idx) => {
          if (updatedAnswers[idx] === q.correctIndex) score++;
        });
        if (score / filteredQuestions.length >= 0.7) {
          confetti({
            particleCount: 80,
            spread: 60,
            origin: { y: 0.6 },
          });
        }
      }, 500);
    }
  };

  const handleNext = () => {
    if (currentIndex < filteredQuestions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setUserAnswers({});
    setIsCompleted(false);
  };

  // Score stats
  let totalScore = 0;
  filteredQuestions.forEach((q, idx) => {
    if (userAnswers[idx] === q.correctIndex) totalScore++;
  });
  const accuracyPct = filteredQuestions.length > 0 ? (totalScore / filteredQuestions.length) * 100 : 0;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header & Filter Controls */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
              <span>Bank Soal & Ujian Interaktif</span>
              <span aria-hidden="true">·</span>
              <span>Berpembahasan Rinci</span>
            </div>
            <h2 className="text-xl font-bold text-slate-900">Arena Latihan Soal Oikonomia</h2>
          </div>
          <button
            onClick={handleRestart}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors whitespace-nowrap"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Mulai Ulang Kuis</span>
          </button>
        </div>

        {/* Filter Segmented Controls */}
        <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-slate-100">
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg">
            <button
              onClick={() => { setSelectedCategory('all'); handleRestart(); }}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                selectedCategory === 'all' ? 'bg-white text-slate-900 shadow-2xs font-semibold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Semua Modul
            </button>
            <button
              onClick={() => { setSelectedCategory('akuntansi'); handleRestart(); }}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                selectedCategory === 'akuntansi' ? 'bg-white text-slate-900 shadow-2xs font-semibold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Akuntansi
            </button>
            <button
              onClick={() => { setSelectedCategory('mikro'); handleRestart(); }}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                selectedCategory === 'mikro' ? 'bg-white text-slate-900 shadow-2xs font-semibold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Mikro
            </button>
            <button
              onClick={() => { setSelectedCategory('makro'); handleRestart(); }}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                selectedCategory === 'makro' ? 'bg-white text-slate-900 shadow-2xs font-semibold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Makro
            </button>
          </div>

          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg">
            <button
              onClick={() => { setSelectedLevel('all'); handleRestart(); }}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                selectedLevel === 'all' ? 'bg-white text-slate-900 shadow-2xs font-semibold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Semua Jenjang
            </button>
            <button
              onClick={() => { setSelectedLevel('SMA/UTBK'); handleRestart(); }}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                selectedLevel === 'SMA/UTBK' ? 'bg-white text-slate-900 shadow-2xs font-semibold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              SMA / UTBK
            </button>
            <button
              onClick={() => { setSelectedLevel('Kuliah S1'); handleRestart(); }}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                selectedLevel === 'Kuliah S1' ? 'bg-white text-slate-900 shadow-2xs font-semibold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Kuliah S1
            </button>
            <button
              onClick={() => { setSelectedLevel('Praktisi'); handleRestart(); }}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                selectedLevel === 'Praktisi' ? 'bg-white text-slate-900 shadow-2xs font-semibold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Praktisi
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      {!isCompleted && currentQ && (
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-2xs space-y-6">
          {/* Progress Header */}
          <div className="flex items-center justify-between text-xs text-slate-500">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-slate-900">
                Soal {currentIndex + 1} dari {filteredQuestions.length}
              </span>
              <span aria-hidden="true">·</span>
              <span>{currentQ.topicTitle}</span>
              <span aria-hidden="true">·</span>
              <span>Target: {currentQ.targetAudience}</span>
            </div>
            <div className="font-mono text-slate-700 font-medium">
              Skor: {totalScore} Benar
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-slate-900 transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / filteredQuestions.length) * 100}%` }}
            />
          </div>

          {/* Question Text */}
          <div className="py-2">
            <h3 className="text-base sm:text-lg font-semibold text-slate-900 leading-relaxed">
              {currentQ.question}
            </h3>
          </div>

          {/* Options */}
          <div className="space-y-3">
            {currentQ.options.map((opt, optIdx) => {
              const selectedAnswer = userAnswers[currentIndex];
              const isAnswered = selectedAnswer !== undefined;
              const isThisOption = selectedAnswer === optIdx;
              const isCorrectOption = optIdx === currentQ.correctIndex;

              let style = 'bg-white border-slate-200 hover:border-slate-400 hover:bg-slate-50 text-slate-800';
              if (isAnswered) {
                if (isCorrectOption) {
                  style = 'bg-emerald-50 border-emerald-500 text-emerald-950 font-semibold';
                } else if (isThisOption) {
                  style = 'bg-rose-50 border-rose-500 text-rose-950 line-through';
                } else {
                  style = 'bg-white border-slate-200 text-slate-400 opacity-60';
                }
              }

              return (
                <button
                  key={optIdx}
                  disabled={isAnswered}
                  onClick={() => handleSelectAnswer(optIdx)}
                  className={`w-full text-left p-4 text-xs sm:text-sm border rounded-lg transition-all flex items-center justify-between gap-3 ${style}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono font-bold text-slate-500 uppercase">
                      {String.fromCharCode(65 + optIdx)}.
                    </span>
                    <span>{opt}</span>
                  </div>
                  {isAnswered && isCorrectOption && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  )}
                  {isAnswered && isThisOption && !isCorrectOption && (
                    <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Explanation if answered */}
          {userAnswers[currentIndex] !== undefined && (
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-1.5 animate-in fade-in duration-200">
              <div className="flex items-center gap-2 font-bold text-xs text-slate-900">
                <HelpCircle className="w-4 h-4 text-slate-600" />
                <span>Pembahasan Lengkap:</span>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed font-normal">
                {currentQ.explanation}
              </p>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <button
              disabled={currentIndex === 0}
              onClick={handlePrev}
              className="px-4 py-2 text-xs font-medium text-slate-600 disabled:opacity-30 hover:text-slate-900 transition-colors"
            >
              ← Soal Sebelumnya
            </button>

            {userAnswers[currentIndex] !== undefined && (
              <button
                onClick={handleNext}
                className="flex items-center gap-1.5 px-4 py-2 text-xs font-medium text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors"
              >
                <span>{currentIndex === filteredQuestions.length - 1 ? 'Selesai & Lihat Rekap' : 'Soal Berikutnya'}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* Completion Summary Card */}
      {isCompleted && (
        <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-2xs space-y-6 text-center">
          <div className="w-16 h-16 bg-emerald-50 border border-emerald-200 rounded-full flex items-center justify-center mx-auto text-emerald-600">
            <Award className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-slate-900">Latihan Selesai!</h3>
            <p className="text-sm text-slate-600">
              Anda telah menyelesaikan seluruh {filteredQuestions.length} soal dalam sesi kuis ini.
            </p>
          </div>

          {/* Score Badge */}
          <div className="inline-flex items-center gap-6 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <div>
              <span className="text-2xs uppercase text-slate-500 font-semibold block">Skor Benar</span>
              <span className="text-2xl font-bold font-mono text-slate-900 tabular-nums">
                {totalScore} / {filteredQuestions.length}
              </span>
            </div>
            <div className="h-8 w-px bg-slate-200" />
            <div>
              <span className="text-2xs uppercase text-slate-500 font-semibold block">Tingkat Akurasi</span>
              <span className="text-2xl font-bold font-mono text-emerald-700 tabular-nums">
                {accuracyPct.toFixed(0)}%
              </span>
            </div>
          </div>

          {/* Detailed Question Review List */}
          <div className="text-left space-y-4 pt-4 border-t border-slate-200">
            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
              Rekapitulasi Pembahasan Jawaban:
            </h4>
            <div className="space-y-3">
              {filteredQuestions.map((q, idx) => {
                const userAns = userAnswers[idx];
                const isCorrect = userAns === q.correctIndex;
                return (
                  <div key={q.id} className="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-2 text-xs">
                    <div className="flex items-start justify-between gap-3 font-semibold text-slate-900">
                      <span>{idx + 1}. {q.question}</span>
                      {isCorrect ? (
                        <span className="text-emerald-700 font-bold shrink-0 flex items-center gap-1">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Benar
                        </span>
                      ) : (
                        <span className="text-rose-700 font-bold shrink-0 flex items-center gap-1">
                          <XCircle className="w-4 h-4 text-rose-600" /> Salah
                        </span>
                      )}
                    </div>
                    <div className="text-slate-600">
                      <strong>Kunci Jawaban: </strong>
                      {String.fromCharCode(65 + q.correctIndex)}. {q.options[q.correctIndex]}
                    </div>
                    <p className="text-slate-700 pt-1 border-t border-slate-200/60 leading-relaxed">
                      {q.explanation}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          <button
            onClick={handleRestart}
            className="px-6 py-2.5 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors"
          >
            Ulangi Latihan Soal
          </button>
        </div>
      )}
    </div>
  );
};
