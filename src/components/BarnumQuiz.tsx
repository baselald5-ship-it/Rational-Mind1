import React, { useState } from 'react';
import { HelpCircle, Award, CheckCircle, ArrowRight, RotateCcw, ShieldCheck, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { QUIZ_QUESTIONS } from '../data/quizData';

export const BarnumQuiz: React.FC = () => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [qId: number]: number }>({});
  const [isCompleted, setIsCompleted] = useState(false);

  const currentQ = QUIZ_QUESTIONS[currentIdx];

  const handleSelectOption = (score: number) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQ.id]: score,
    }));
  };

  const handleNext = () => {
    if (currentIdx < QUIZ_QUESTIONS.length - 1) {
      setCurrentIdx((prev) => prev + 1);
    } else {
      setIsCompleted(true);
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#0d9488', '#14b8a6', '#f59e0b', '#3b82f6'],
        });
      } catch {
        // Ignore
      }
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setSelectedAnswers({});
    setIsCompleted(false);
  };

  const totalScore = Object.values(selectedAnswers).reduce((a, b) => a + b, 0);

  const getAssessment = (score: number) => {
    if (score <= 3) {
      return {
        badge: 'Benteng Rasional Tangguh',
        color: 'text-emerald-700 bg-emerald-50 border-emerald-200',
        title: 'Tingkat Kerentanan: Sangat Rendah (0-3 Poin)',
        desc: 'Hebat! Kamu memiliki Locus of Control Internal yang kokoh dan kepekaan tinggi terhadap trik Efek Barnum dan konfirmasi bias. Kamu tidak mudah panik hanya karena kalimat horoskop atau ramalan viral di media sosial.',
        tips: 'Pertahankan skeptisisme sehatmu dan bantu teman-teman di sekitarmu agar tidak terjebak kecemasan kosmik yang sia-sia.',
      };
    } else if (score <= 6) {
      return {
        badge: 'Rasional Terbuka (Moderat)',
        color: 'text-amber-700 bg-amber-50 border-amber-200',
        title: 'Tingkat Kerentanan: Sedang (4-6 Poin)',
        desc: 'Kamu secara umum logis, namun terkadang saat kondisi fisik sedang lelah, stres berat, atau cemas akan masa depan, sugesti ramalan zodiak bisa menyusup ke pikiran bawah sadarmu.',
        tips: 'Ingat bahwa kebetulan terjadi secara statistik di dunia nyata. Saat mulai cemas karena zodiak, segera gunakan teknik Grounding 4-7-8 atau cek Kamus Sains di aplikasi ini.',
      };
    } else {
      return {
        badge: 'Perlu Penguatan Logika',
        color: 'text-rose-700 bg-rose-50 border-rose-200',
        title: 'Tingkat Kerentanan: Tinggi (7-10 Poin)',
        desc: 'Kamu cukup rentan terhadap sugesti eksternal dan sering mengaitkan nasibmu dengan bintang. Hal ini membuat energimu terkuras untuk mencemaskan hal-hal mistis yang sebenarnya tidak nyata.',
        tips: 'Jangan berkecil hati. Kamu bisa melatih otakmu kembali dengan sesi konseling CBT Rational Mind Bot dan mencatat jurnal harian untuk mengambil kendali hidupmu kembali.',
      };
    }
  };

  const assessment = getAssessment(totalScore);

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-900 via-indigo-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 text-teal-200 text-xs font-semibold">
            <HelpCircle className="w-3.5 h-3.5" />
            Asesmen Kognitif Mandiri
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Tes Kerentanan Efek Barnum & Cocoklogi
          </h2>
          <p className="text-sm text-teal-100/90 max-w-xl">
            Cari tahu seberapa mudah pikiranmu terpengaruh oleh ramalan umum dan sugesti astrologi buatan.
          </p>
        </div>
      </div>

      {!isCompleted ? (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          {/* Progress bar */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-bold text-slate-500">
              <span>Pertanyaan {currentIdx + 1} dari {QUIZ_QUESTIONS.length}</span>
              <span>{Math.round(((currentIdx + 1) / QUIZ_QUESTIONS.length) * 100)}%</span>
            </div>
            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-teal-600 transition-all duration-300"
                style={{ width: `${((currentIdx + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Question Box */}
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-2.5 py-1 rounded-md">
              {currentQ.question}
            </span>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 pt-1">
              {currentQ.scenario}
            </h3>
          </div>

          {/* Options */}
          <div className="space-y-3">
            {currentQ.options.map((opt, idx) => {
              const isSelected = selectedAnswers[currentQ.id] === opt.score;
              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(opt.score)}
                  className={`w-full p-4 rounded-2xl border text-left transition flex items-start gap-3.5 ${
                    isSelected
                      ? 'border-teal-600 bg-teal-50/80 ring-2 ring-teal-500/20 shadow-xs'
                      : 'border-slate-200 hover:border-slate-300 bg-slate-50/50 hover:bg-slate-100/60'
                  }`}
                >
                  <div className="shrink-0 pt-0.5">
                    <div
                      className={`w-5 h-5 rounded-full border flex items-center justify-center text-xs ${
                        isSelected
                          ? 'border-teal-600 bg-teal-600 text-white'
                          : 'border-slate-300 text-transparent'
                      }`}
                    >
                      ✓
                    </div>
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm font-semibold text-slate-900">{opt.label}</p>
                    <p className="text-[11px] text-slate-500 mt-0.5">{opt.description}</p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Next Button */}
          <div className="flex justify-end pt-2">
            <button
              disabled={selectedAnswers[currentQ.id] === undefined}
              onClick={handleNext}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-2xl font-bold text-xs transition ${
                selectedAnswers[currentQ.id] !== undefined
                  ? 'bg-teal-600 text-white hover:bg-teal-700 shadow-md cursor-pointer'
                  : 'bg-slate-100 text-slate-400 cursor-not-allowed'
              }`}
            >
              <span>{currentIdx === QUIZ_QUESTIONS.length - 1 ? 'Lihat Hasil Asesmen' : 'Pertanyaan Selanjutnya'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        /* Results Card */
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-6 text-center">
          <div className="w-16 h-16 rounded-3xl bg-teal-50 border border-teal-200 text-teal-700 flex items-center justify-center mx-auto shadow-sm">
            <Award className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold border ${assessment.color}`}>
              {assessment.badge}
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900">
              {assessment.title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto leading-relaxed">
              {assessment.desc}
            </p>
          </div>

          {/* Actionable tip box */}
          <div className="p-5 rounded-2xl bg-teal-50/80 border border-teal-200 text-left max-w-lg mx-auto space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-teal-900 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-teal-600" />
              Rekomendasi Psikologis untuk Anda:
            </h4>
            <p className="text-xs text-teal-950 leading-relaxed font-medium">
              {assessment.tips}
            </p>
          </div>

          <div className="pt-4 flex items-center justify-center gap-3">
            <button
              onClick={handleRestart}
              className="flex items-center gap-2 px-5 py-2.5 rounded-2xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 transition"
            >
              <RotateCcw className="w-4 h-4" />
              Ulangi Asesmen
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
