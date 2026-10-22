import React, { useState } from 'react';
import {
  Brain,
  Sparkles,
  Search,
  Hourglass,
  ArrowRight,
  ShieldAlert,
  Compass,
  MessageSquare,
  KeyRound,
  CheckCircle2,
} from 'lucide-react';
import { TherapistPersona } from '../types';

interface SecretBrainMenuProps {
  onEnterTherapy: (persona: TherapistPersona, initialPrompt?: string) => void;
  onOpenGrounding: () => void;
}

export const SecretBrainMenu: React.FC<SecretBrainMenuProps> = ({
  onEnterTherapy,
  onOpenGrounding,
}) => {
  const [customInput, setCustomInput] = useState('');
  const [selectedPersona, setSelectedPersona] = useState<TherapistPersona>('MAUDY');

  const handleStartConsultation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customInput.trim()) {
      onEnterTherapy(selectedPersona);
    } else {
      onEnterTherapy(selectedPersona, `${selectedPersona} - ${customInput.trim()}`);
    }
  };

  const handleQuickPrompt = (persona: TherapistPersona, prompt: string) => {
    onEnterTherapy(persona, prompt);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn py-2">
      {/* [LOGO RATIONAL MIND - SPLASH SCREEN] */}
      <div className="text-center space-y-4 pt-4 pb-2">
        <div className="inline-flex items-center justify-center p-3.5 bg-gradient-to-tr from-teal-600 via-emerald-600 to-indigo-600 rounded-3xl text-white shadow-xl shadow-teal-900/10 animate-float">
          <Brain className="w-12 h-12 text-white" />
        </div>

        <div className="space-y-2">
          <div className="inline-block px-3 py-1 rounded-full bg-teal-100 text-teal-800 text-xs font-extrabold uppercase tracking-widest border border-teal-200">
            Halaman 1: Menu Utama Rahasia
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Rational Mind
          </h1>
          <p className="text-sm sm:text-base font-medium text-slate-600 max-w-xl mx-auto italic">
            "Cemas karena ramalan bintang minggu ini sial? Mari beralih ke ketenangan yang masuk akal."
          </p>
        </div>
      </div>

      {/* [MENU RAHASIA: KAMUS RAHASIA OTAK] */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
        <div className="border-b border-slate-100 pb-4">
          <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-3 py-1 rounded-full">
            Kamus Rahasia Otak (Anti-Cocoklogi)
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-2">
            3 Trik Otak yang Bikin Manusia Terjebak Cocoklogi Zodiak
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Sebelum kamu curhat, pahami mekanisme distorsi kognitif ini agar kamu tidak lagi tertipu oleh ilusi ramalan bintang:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* 1. Efek Barnum */}
          <div className="rounded-2xl p-5 border border-amber-200/90 bg-amber-50/50 hover:bg-amber-50 transition space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-lg">
              🃏
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm">
                1. Efek Barnum (Barnum Effect)
              </h3>
              <span className="text-[10px] text-amber-800 font-bold block uppercase tracking-wide">
                Ilusi Pernyataan Universal
              </span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Fenomena psikologis ketika kamu merasa ramalan zodiak yang sangat umum seolah dibuat khusus untuk dirimu.
            </p>
            <div className="p-2.5 rounded-xl bg-white/90 border border-amber-200 text-[11px] text-amber-950 italic">
              "Kamu mandiri tapi kadang butuh teman." Padahal 99% manusia di bumi memang begitu!
            </div>
          </div>

          {/* 2. Konfirmasi Bias */}
          <div className="rounded-2xl p-5 border border-sky-200/90 bg-sky-50/50 hover:bg-sky-50 transition space-y-3">
            <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-800 flex items-center justify-center font-bold text-lg">
              🔍
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm">
                2. Konfirmasi Bias (Confirmation Bias)
              </h3>
              <span className="text-[10px] text-sky-800 font-bold block uppercase tracking-wide">
                Memori Selektif
              </span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Kecenderungan otakmu untuk hanya mengingat 1 ramalan zodiak yang kebetulan "terjadi nyata" dan otomatis melupakan 99 ramalan lainnya yang salah total.
            </p>
            <div className="p-2.5 rounded-xl bg-white/90 border border-sky-200 text-[11px] text-sky-950 italic">
              Jika ada 1 kebetulan pas, kamu kagum seumur hidup; saat ramalan meleset, otakmu langsung menghapusnya.
            </div>
          </div>

          {/* 3. Self-Fulfilling Prophecy */}
          <div className="rounded-2xl p-5 border border-rose-200/90 bg-rose-50/50 hover:bg-rose-50 transition space-y-3">
            <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-800 flex items-center justify-center font-bold text-lg">
              ⏳
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm">
                3. Self-Fulfilling Prophecy
              </h3>
              <span className="text-[10px] text-rose-800 font-bold block uppercase tracking-wide">
                Ramalan yang Diwujudkan Sendiri
              </span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Kondisi saat kamu membaca ramalan sial, lalu otakmu cemas. Karena cemas, kamu tidak fokus belajar, sehingga nilai UTS jelek.
            </p>
            <div className="p-2.5 rounded-xl bg-white/90 border border-rose-200 text-[11px] text-rose-950 italic">
              Kamu menyalahkan zodiak, padahal kegagalan itu terjadi murni karena kecemasan dan stres fisikmu sendiri.
            </div>
          </div>
        </div>
      </div>

      {/* [GERBANG AKSES TERAPI] */}
      <div className="bg-gradient-to-r from-slate-900 via-teal-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2">
            <KeyRound className="w-5 h-5 text-teal-400" />
            <h2 className="text-lg sm:text-xl font-black tracking-tight">
              [GERBANG AKSES TERAPI]
            </h2>
          </div>
          <span className="text-xs text-teal-300 font-semibold bg-teal-900/60 px-3 py-1 rounded-full border border-teal-500/30">
            Kunci Rahasia Terbuka
          </span>
        </div>

        <p className="text-xs sm:text-sm text-slate-300">
          Kunci rahasia sudah dibuka. Untuk mulai berkonsultasi secara ilmiah di <strong>[HALAMAN 2: TERAPI CHAT]</strong>, pilih persona terapis Anda atau ketik perintah di bawah ini:
        </p>

        {/* 2 Persona Cards with Real Photos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Persona Maudy Card */}
          <div
            onClick={() => setSelectedPersona('MAUDY')}
            className={`p-5 rounded-2xl border transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between ${
              selectedPersona === 'MAUDY'
                ? 'border-emerald-400 bg-emerald-950/70 ring-2 ring-emerald-400/50 shadow-lg'
                : 'border-slate-800 bg-slate-800/60 hover:bg-slate-800'
            }`}
          >
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <img
                  src="/assets/aistudio/Screenshot_20261020-184009_1bea9d79.png"
                  alt="Maudy Ayunda"
                  className="w-12 h-12 rounded-2xl object-cover object-top border-2 border-emerald-400 shrink-0"
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                      👉 Tipe Empatis
                    </span>
                    {selectedPersona === 'MAUDY' && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    )}
                  </div>
                  <h3 className="font-extrabold text-base text-white">Maudy Ayunda</h3>
                  <span className="text-[11px] text-emerald-200">Gaya: Aku-Kamu • Hangat & Santun</span>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                Memvalidasi perasaan cemas terlebih dahulu dengan lembut, lalu mengedukasi dengan logika psikologi klinis secara santun khas anak muda cerdas.
              </p>

              <div className="p-2.5 rounded-xl bg-slate-900/90 border border-emerald-500/30 text-[11px] font-mono text-emerald-300">
                Format: <strong>MAUDY - [Tulis curhatan zodiakmu]</strong>
              </div>
            </div>

            <button
              onClick={() => onEnterTherapy('MAUDY')}
              className="mt-4 w-full py-2 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition"
            >
              <span>Masuk Konseling dengan Maudy</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Persona Benedict Card */}
          <div
            onClick={() => setSelectedPersona('BENEDICT')}
            className={`p-5 rounded-2xl border transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between ${
              selectedPersona === 'BENEDICT'
                ? 'border-indigo-400 bg-indigo-950/70 ring-2 ring-indigo-400/50 shadow-lg'
                : 'border-slate-800 bg-slate-800/60 hover:bg-slate-800'
            }`}
          >
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <img
                  src="/assets/aistudio/Screenshot_20261020-184059_e9b95ea1.png"
                  alt="Benedict Cumberbatch"
                  className="w-12 h-12 rounded-2xl object-cover object-top border-2 border-indigo-400 shrink-0"
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
                      👉 Tipe Analis Tegas
                    </span>
                    {selectedPersona === 'BENEDICT' && (
                      <CheckCircle2 className="w-4 h-4 text-indigo-400" />
                    )}
                  </div>
                  <h3 className="font-extrabold text-base text-white">Benedict Cumberbatch</h3>
                  <span className="text-[11px] text-indigo-200">Gaya: Saya-Anda • Sherlock Reality Check</span>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                Tegas, formal, blak-blakan, sangat logis, dan langsung ke inti masalah dengan data ilmiah murni untuk langsung memotong kecemasan.
              </p>

              <div className="p-2.5 rounded-xl bg-slate-900/90 border border-indigo-500/30 text-[11px] font-mono text-indigo-300">
                Format: <strong>BENEDICT - [Tulis curhatan zodiakmu]</strong>
              </div>
            </div>

            <button
              onClick={() => onEnterTherapy('BENEDICT')}
              className="mt-4 w-full py-2 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition"
            >
              <span>Masuk Konseling dengan Benedict</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Direct Transition Input Box */}
        <form onSubmit={handleStartConsultation} className="space-y-3 pt-2">
          <label className="block text-xs font-bold text-slate-300">
            Atau langsung tuliskan kecemasan zodiak Anda di sini untuk membuka [HALAMAN 2: TERAPI CHAT]:
          </label>
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="flex-1 relative">
              <input
                type="text"
                value={customInput}
                onChange={(e) => setCustomInput(e.target.value)}
                placeholder={`Ketik contoh: "${selectedPersona} - Kak, zodiakku minggu ini katanya sial..."`}
                className="w-full bg-slate-800/90 border border-slate-700 text-white placeholder:text-slate-400 text-xs sm:text-sm px-4 py-3 rounded-2xl outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-400/20 transition"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3 bg-teal-500 hover:bg-teal-400 text-slate-950 font-extrabold text-xs sm:text-sm rounded-2xl flex items-center justify-center gap-2 transition shadow-md shrink-0 cursor-pointer"
            >
              <MessageSquare className="w-4 h-4" />
              Buka Halaman 2 (Chat)
            </button>
          </div>
        </form>

        {/* Quick Sample Triggers */}
        <div className="space-y-2 pt-2 border-t border-slate-800 text-xs text-slate-400">
          <span className="font-semibold block">Contoh Akses Langsung Sekali Klik:</span>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() =>
                handleQuickPrompt(
                  'MAUDY',
                  'MAUDY - Kak, aku cemas banget karena kata zodiak minggu ini keuangan aku sial karena planet lagi berantakan. Aku jadi ga fokus belajar buat UTS.'
                )
              }
              className="text-[11px] bg-slate-800/90 hover:bg-emerald-950/80 hover:text-emerald-300 border border-slate-700 hover:border-emerald-500 px-3 py-1.5 rounded-xl transition text-left"
            >
              🎓 MAUDY: Keuangan Sial & Stres UTS
            </button>

            <button
              onClick={() =>
                handleQuickPrompt(
                  'BENEDICT',
                  'BENEDICT - Saya cemas sekali karena ramalan zodiak mengatakan karir saya hancur bulan ini akibat Mercury Retrograde. Saya jadi tidak bersemangat kerja.'
                )
              }
              className="text-[11px] bg-slate-800/90 hover:bg-indigo-950/80 hover:text-indigo-300 border border-slate-700 hover:border-indigo-500 px-3 py-1.5 rounded-xl transition text-left"
            >
              🪐 BENEDICT: Karir Hancur & Mercury Retrograde
            </button>

            <button
              onClick={() =>
                handleQuickPrompt(
                  'MAUDY',
                  'MAUDY - Pacarku mutusin aku gara-gara kata zodiak kita ga cocok, elemen dia air dan aku api jadi katanya bakal berantem terus. Aku sedih banget.'
                )
              }
              className="text-[11px] bg-slate-800/90 hover:bg-emerald-950/80 hover:text-emerald-300 border border-slate-700 hover:border-emerald-500 px-3 py-1.5 rounded-xl transition text-left"
            >
              💔 MAUDY: Putus Elemen Air & Api
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
