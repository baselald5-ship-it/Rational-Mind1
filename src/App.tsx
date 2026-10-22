import React, { useState } from 'react';
import {
  Brain,
  MessageSquare,
  Wind,
  BookOpen,
  HelpCircle,
  AlertTriangle,
  HeartHandshake,
  Sparkles,
  KeyRound,
} from 'lucide-react';
import { SecretBrainMenu } from './components/SecretBrainMenu';
import { TherapyChat } from './components/TherapyChat';
import { BreathingStudio } from './components/BreathingStudio';
import { CBTWorksheet } from './components/CBTWorksheet';
import { DebunkLibrary } from './components/DebunkLibrary';
import { BarnumQuiz } from './components/BarnumQuiz';
import { AmbientPlayer } from './components/AmbientPlayer';
import { CrisisModal } from './components/CrisisModal';
import { TherapistPersona } from './types';

type ActiveTab = 'secret_menu' | 'chat' | 'breathing' | 'cbt' | 'debunk' | 'quiz';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('secret_menu');
  const [activePersona, setActivePersona] = useState<TherapistPersona>('MAUDY');
  const [initialChatPrompt, setInitialChatPrompt] = useState<string | null>(null);
  const [isCrisisModalOpen, setIsCrisisModalOpen] = useState(false);

  const handleEnterTherapy = (persona: TherapistPersona, initialPrompt?: string) => {
    setActivePersona(persona);
    if (initialPrompt) {
      setInitialChatPrompt(initialPrompt);
    } else {
      setInitialChatPrompt(null);
    }
    setActiveTab('chat');
  };

  const handleBackToMenu = () => {
    setActiveTab('secret_menu');
  };

  const handleOpenGrounding = () => {
    setActiveTab('breathing');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-teal-100 selection:text-teal-900">
      {/* Top Banner Alert / Reassurance */}
      <div className="bg-gradient-to-r from-teal-900 via-slate-900 to-indigo-950 text-teal-100 text-xs px-4 py-2 border-b border-teal-800/40">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 truncate">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
            <span className="truncate">
              <strong>Rational Mind V2:</strong> Sistem 2-Halaman (Halaman 1: Kamus Rahasia Otak → Halaman 2: Terapi Chat Ilmiah).
            </span>
          </div>
          <div className="flex items-center gap-3 shrink-0 ml-4">
            <button
              onClick={() => setActiveTab('secret_menu')}
              className="text-xs text-teal-300 hover:text-white font-bold underline cursor-pointer"
              title="Ketik atau klik untuk membuka Halaman 1"
            >
              BUKA APLIKASI
            </button>
            <span className="text-slate-600">|</span>
            <button
              onClick={() => setIsCrisisModalOpen(true)}
              className="flex items-center gap-1.5 text-xs text-rose-300 hover:text-rose-100 font-semibold underline underline-offset-2 cursor-pointer"
            >
              <HeartHandshake className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Layanan Darurat 119 ext 8</span>
              <span className="sm:hidden">Darurat</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Logo & Identity */}
          <div
            onClick={() => setActiveTab('secret_menu')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-teal-600 to-emerald-500 text-white flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-extrabold text-base sm:text-lg tracking-tight text-slate-900">
                  Rational Mind
                </h1>
                <span className="hidden md:inline-block text-[10px] uppercase font-bold text-teal-800 bg-teal-100 px-2 py-0.5 rounded-full">
                  Anti-Cocoklogi V2
                </span>
              </div>
              <p className="text-[11px] text-slate-500 hidden sm:block -mt-0.5">
                Klinik Kognitif & Kamus Sains Otak
              </p>
            </div>
          </div>

          {/* Navigation Tabs (Desktop) */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-100/80 p-1 rounded-2xl border border-slate-200/80">
            <button
              onClick={() => setActiveTab('secret_menu')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                activeTab === 'secret_menu'
                  ? 'bg-white text-teal-900 shadow-xs border border-slate-200/60'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <KeyRound className="w-3.5 h-3.5 text-teal-600" />
              Halaman 1: Menu Rahasia
            </button>

            <button
              onClick={() => setActiveTab('chat')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                activeTab === 'chat'
                  ? 'bg-white text-teal-900 shadow-xs border border-slate-200/60'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5 text-teal-600" />
              Halaman 2: Terapi Chat
            </button>

            <button
              onClick={() => setActiveTab('breathing')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer ${
                activeTab === 'breathing'
                  ? 'bg-white text-teal-900 shadow-xs border border-slate-200/60 font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Wind className="w-3.5 h-3.5 text-teal-600" />
              Grounding
            </button>

            <button
              onClick={() => setActiveTab('cbt')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer ${
                activeTab === 'cbt'
                  ? 'bg-white text-teal-900 shadow-xs border border-slate-200/60 font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-teal-600" />
              Lembar CBT
            </button>

            <button
              onClick={() => setActiveTab('debunk')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer ${
                activeTab === 'debunk'
                  ? 'bg-white text-teal-900 shadow-xs border border-slate-200/60 font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 text-teal-600" />
              Kamus Sains
            </button>

            <button
              onClick={() => setActiveTab('quiz')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer ${
                activeTab === 'quiz'
                  ? 'bg-white text-teal-900 shadow-xs border border-slate-200/60 font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5 text-teal-600" />
              Tes Barnum
            </button>
          </nav>

          {/* Right Action Tools */}
          <div className="flex items-center gap-2">
            <AmbientPlayer />
            <button
              onClick={() => setIsCrisisModalOpen(true)}
              className="p-2 rounded-xl text-rose-600 bg-rose-50 hover:bg-rose-100 border border-rose-200 transition cursor-pointer"
              title="Bantuan Darurat Psikologis"
              aria-label="Bantuan Darurat Psikologis"
            >
              <AlertTriangle className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Mobile Navigation Bar */}
        <div className="lg:hidden flex items-center justify-around px-2 py-1.5 bg-slate-50 border-t border-slate-200 overflow-x-auto">
          <button
            onClick={() => setActiveTab('secret_menu')}
            className={`flex flex-col items-center gap-1 py-1 px-2.5 rounded-xl text-[10px] font-bold shrink-0 ${
              activeTab === 'secret_menu' ? 'text-teal-700 font-extrabold' : 'text-slate-600'
            }`}
          >
            <KeyRound className="w-4 h-4" />
            <span>Halaman 1</span>
          </button>
          <button
            onClick={() => setActiveTab('chat')}
            className={`flex flex-col items-center gap-1 py-1 px-2.5 rounded-xl text-[10px] font-bold shrink-0 ${
              activeTab === 'chat' ? 'text-teal-700 font-extrabold' : 'text-slate-600'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>Halaman 2</span>
          </button>
          <button
            onClick={() => setActiveTab('breathing')}
            className={`flex flex-col items-center gap-1 py-1 px-2.5 rounded-xl text-[10px] font-bold shrink-0 ${
              activeTab === 'breathing' ? 'text-teal-700 font-extrabold' : 'text-slate-600'
            }`}
          >
            <Wind className="w-4 h-4" />
            <span>Grounding</span>
          </button>
          <button
            onClick={() => setActiveTab('cbt')}
            className={`flex flex-col items-center gap-1 py-1 px-2.5 rounded-xl text-[10px] font-bold shrink-0 ${
              activeTab === 'cbt' ? 'text-teal-700 font-extrabold' : 'text-slate-600'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>CBT</span>
          </button>
          <button
            onClick={() => setActiveTab('debunk')}
            className={`flex flex-col items-center gap-1 py-1 px-2.5 rounded-xl text-[10px] font-bold shrink-0 ${
              activeTab === 'debunk' ? 'text-teal-700 font-extrabold' : 'text-slate-600'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Kamus</span>
          </button>
          <button
            onClick={() => setActiveTab('quiz')}
            className={`flex flex-col items-center gap-1 py-1 px-2.5 rounded-xl text-[10px] font-bold shrink-0 ${
              activeTab === 'quiz' ? 'text-teal-700 font-extrabold' : 'text-slate-600'
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            <span>Tes</span>
          </button>
        </div>
      </header>

      {/* Main View Area */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-6">
        {activeTab === 'secret_menu' && (
          <SecretBrainMenu
            onEnterTherapy={handleEnterTherapy}
            onOpenGrounding={handleOpenGrounding}
          />
        )}

        {activeTab === 'chat' && (
          <TherapyChat
            onOpenGrounding={handleOpenGrounding}
            onBackToMenu={handleBackToMenu}
            initialPrompt={initialChatPrompt}
            initialPersona={activePersona}
          />
        )}

        {activeTab === 'breathing' && <BreathingStudio />}

        {activeTab === 'cbt' && <CBTWorksheet />}

        {activeTab === 'debunk' && <DebunkLibrary />}

        {activeTab === 'quiz' && <BarnumQuiz />}
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-200 bg-white py-6 px-4 text-center text-xs text-slate-500">
        <div className="max-w-6xl mx-auto space-y-2">
          <p className="font-semibold text-slate-700">
            Rational Mind: Anti-Cocoklogi Therapy (V2 - Multi-Page System)
          </p>
          <p className="text-[11px] text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Halaman 1: Kamus Rahasia Otak (Efek Barnum, Konfirmasi Bias, Self-Fulfilling Prophecy) • Halaman 2: Terapi Chat Ilmiah (Maudy & Benedict)
          </p>
        </div>
      </footer>

      {/* Crisis / Emergency Hotline Modal */}
      <CrisisModal
        isOpen={isCrisisModalOpen}
        onClose={() => setIsCrisisModalOpen(false)}
      />
    </div>
  );
}
