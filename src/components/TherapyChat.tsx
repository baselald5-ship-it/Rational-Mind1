import React, { useState, useEffect, useRef } from 'react';
import {
  Send,
  Heart,
  Brain,
  Wind,
  CheckSquare,
  Sparkles,
  Volume2,
  VolumeX,
  Copy,
  Check,
  RotateCcw,
  Download,
  AlertCircle,
  ShieldCheck,
  ChevronRight,
  UserCheck,
  ArrowLeft,
  BookOpen,
} from 'lucide-react';
import { ChatMessage, ParsedTherapySections, TherapistPersona } from '../types';
import { parseTherapyResponse } from '../utils/textParser';

interface TherapyChatProps {
  onOpenGrounding: () => void;
  onOpenWorksheetWithPrompt?: (prompt: string) => void;
  onBackToMenu?: () => void;
  initialPrompt?: string | null;
  initialPersona?: TherapistPersona;
}

export const TherapyChat: React.FC<TherapyChatProps> = ({
  onOpenGrounding,
  onOpenWorksheetWithPrompt,
  onBackToMenu,
  initialPrompt,
  initialPersona = 'MAUDY',
}) => {
  const [selectedPersona, setSelectedPersona] = useState<TherapistPersona>(initialPersona);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [speakingId, setSpeakingId] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const initialPromptSentRef = useRef<boolean>(false);

  const personaDetails = {
    MAUDY: {
      name: 'Maudy Ayunda',
      role: 'Intelektual Empatik & Edukatif',
      style: 'Ramah, hangat, menggunakan "Aku-Kamu", menenangkan khas anak muda cerdas.',
      method: 'Validasi emosi lembut + edukasi logika psikologi klinis santun.',
      avatar: '/assets/aistudio/Screenshot_20261020-184009_1bea9d79.png',
      badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
      activeBorder: 'border-emerald-500 bg-emerald-50/60 text-emerald-950',
      accentColor: 'teal',
      samplePrefix: 'MAUDY',
    },
    BENEDICT: {
      name: 'Benedict Cumberbatch',
      role: 'Analis Rasional & Reality Check',
      style: 'Tegas, profesional formal, menggunakan "Saya-Anda", analitis tajam (Sherlock vibes).',
      method: 'Tamparan realitas berbasis data ilmiah murni langsung memotong kecemasan.',
      avatar: '/assets/aistudio/Screenshot_20261020-184059_e9b95ea1.png',
      badgeColor: 'bg-indigo-100 text-indigo-900 border-indigo-300',
      activeBorder: 'border-indigo-600 bg-indigo-50/60 text-indigo-950',
      accentColor: 'indigo',
      samplePrefix: 'BENEDICT',
    },
  };

  const promptSuggestions = {
    MAUDY: [
      {
        title: 'Keuangan Sial & Gagal UTS',
        query:
          'MAUDY - Kak, aku cemas banget karena kata zodiak minggu ini keuangan aku sial karena planet lagi berantakan. Aku jadi ga fokus belajar buat UTS.',
        emoji: '🎓',
      },
      {
        title: 'Putus Cinta Karena Elemen Air & Api',
        query:
          'MAUDY - Pacarku mutusin aku gara-gara kata zodiak kita ga cocok, elemen dia air dan aku api jadi katanya bakal berantem terus. Aku sedih banget dan ngerasa ga berharga.',
        emoji: '💔',
      },
      {
        title: 'Ramalan Ditakdirkan Seret Rezeki',
        query:
          'MAUDY - Kak, ada ramalan zodiak yang bilang bintang kelahiranku ditakdirkan susah kaya dan seret rezeki seumur hidup. Bikin kepikiran terus ngerasa usahaku sia-sia.',
        emoji: '💰',
      },
    ],
    BENEDICT: [
      {
        title: 'Karier Hancur Akibat Mercury Retrograde',
        query:
          'BENEDICT - Saya cemas sekali karena ramalan zodiak mengatakan karir saya hancur bulan ini akibat Mercury Retrograde. Saya jadi tidak bersemangat kerja.',
        emoji: '🪐',
      },
      {
        title: 'Pembenaran Karakter Toxic Bawaan Bintang',
        query:
          'BENEDICT - Rekan-rekan saya mengatakan wajar jika saya bersikap agresif dan tidak sabaran karena itu tabiat zodiak kelahiran saya. Apakah kepribadian saya memang terkunci oleh bintang?',
        emoji: '⚡',
      },
      {
        title: 'Takut Memulai Bisnis Baru Karena Ramalan Sial',
        query:
          'BENEDICT - Saya membaca prediksi astrologi bahwa investasi yang dimulai bulan ini akan mengalami kerugian total karena oposisi planet Saturnus. Saya menunda peluncuran usaha saya.',
        emoji: '📊',
      },
    ],
  };

  // Load chat history or initialize welcome messages
  useEffect(() => {
    try {
      const saved = localStorage.getItem('rational_mind_chat_history_v2');
      if (initialPersona) {
        setSelectedPersona(initialPersona);
      }

      if (saved) {
        setMessages(JSON.parse(saved));
      } else {
        const welcomeMessage: ChatMessage = {
          id: 'welcome-msg',
          role: 'model',
          persona: initialPersona || 'MAUDY',
          timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
          text: `[Validasi Emosi]
Halo! Selamat datang di [HALAMAN 2: TERAPI CHAT]. Gerbang akses terapi telah terbuka setelah kamu membaca Kamus Rahasia Otak di Halaman 1. Di sini, segala kecemasanmu tentang masa depan dan ramalan zodiak akan kita bedah secara ilmiah dan objektif.

[Analisis Rasional / Patahkan Mitos Zodiak]
Ketahuilah bahwa posisi planet dan rasi bintang tidak memiliki gaya fisik untuk menentukan nilai ujian, karier, atau jodohmu. Otak manusia secara alami rentan terhadap *Efek Barnum* dan *Konfirmasi Bias*. Apa yang terjadi di masa depanmu ditentukan oleh apa yang kamu pelajari dan usahakan hari ini, bukan konstelasi bintang.

[Latihan Grounding Fisik]
Sebelum kita masuk ke inti konsultasi, yuk rilekskan tubuhmu sejenak:
1. Tarik napas lembut melalui hidung dalam 4 detik.
2. Tahan napas selama 7 detik.
3. Hembuskan perlahan lewat mulut selama 8 detik. Ulangi 3 kali ya.

[Action Plan Logis Hari Ini]
1. Tuliskan keluhan atau kecemasan zodiakmu dengan format: [Karakter] - [Curhatanmu].
2. Kamu juga bisa berganti persona kapan saja antara Maudy (empati hangat) atau Benedict (Sherlock reality check).`,
        };
        welcomeMessage.parsed = parseTherapyResponse(welcomeMessage.text);
        setMessages([welcomeMessage]);
      }
    } catch {
      // Ignore
    }
  }, [initialPersona]);

  // Handle initial prompt from Halaman 1 if provided
  useEffect(() => {
    if (initialPrompt && !initialPromptSentRef.current) {
      initialPromptSentRef.current = true;
      handleSendMessage(initialPrompt);
    }
  }, [initialPrompt]);

  // Save to local storage
  useEffect(() => {
    if (messages.length > 0) {
      try {
        localStorage.setItem('rational_mind_chat_history_v2', JSON.stringify(messages));
      } catch {
        // Ignore
      }
    }
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSelectPersona = (persona: TherapistPersona) => {
    setSelectedPersona(persona);
    try {
      localStorage.setItem('rational_mind_selected_persona', persona);
    } catch {
      // Ignore
    }
  };

  const handleSendMessage = async (textToSend?: string) => {
    let text = (textToSend || inputMessage).trim();
    if (!text || isLoading) return;

    setErrorMsg(null);
    setInputMessage('');

    // If user writes "BUKA APLIKASI", navigate back to Halaman 1
    if (text.toUpperCase() === 'BUKA APLIKASI' && onBackToMenu) {
      onBackToMenu();
      return;
    }

    // Detect if user wrote a persona prefix explicitly
    let detectedPersona = selectedPersona;
    if (text.toUpperCase().startsWith('BENEDICT -') || text.toUpperCase().startsWith('BENEDICT:')) {
      detectedPersona = 'BENEDICT';
      setSelectedPersona('BENEDICT');
    } else if (text.toUpperCase().startsWith('MAUDY -') || text.toUpperCase().startsWith('MAUDY:')) {
      detectedPersona = 'MAUDY';
      setSelectedPersona('MAUDY');
    } else {
      text = `${selectedPersona} - ${text}`;
    }

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      text,
      timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
    };

    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const historyPayload = newMessages.map((m) => ({
        role: m.role,
        text: m.text,
      }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          persona: detectedPersona,
          history: historyPayload.slice(-8),
        }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || 'Gagal memproses sesi konseling.');
      }

      const data = await res.json();
      const botReply = data.reply || '';

      const modelMsg: ChatMessage = {
        id: `model-${Date.now()}`,
        role: 'model',
        persona: detectedPersona,
        text: botReply,
        timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
        parsed: parseTherapyResponse(botReply),
      };

      setMessages((prev) => [...prev, modelMsg]);
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || 'Terjadi kesalahan jaringan.');
    } finally {
      setIsLoading(false);
      setTimeout(() => {
        textareaRef.current?.focus();
      }, 100);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleToggleActionItem = (msgId: string, itemId: string) => {
    setMessages((prev) =>
      prev.map((msg) => {
        if (msg.id === msgId && msg.parsed) {
          const updatedItems = msg.parsed.actionItems.map((item) =>
            item.id === itemId ? { ...item, done: !item.done } : item
          );
          return {
            ...msg,
            parsed: {
              ...msg.parsed,
              actionItems: updatedItems,
            },
          };
        }
        return msg;
      })
    );
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSpeak = (id: string, text: string, persona?: TherapistPersona) => {
    if (!('speechSynthesis' in window)) return;

    if (speakingId === id) {
      window.speechSynthesis.cancel();
      setSpeakingId(null);
      return;
    }

    window.speechSynthesis.cancel();
    const cleanText = text
      .replace(/\[.*?\]/g, '')
      .replace(/[#*]/g, '')
      .trim();

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = 'id-ID';
    if (persona === 'BENEDICT') {
      utterance.rate = 1.0;
      utterance.pitch = 0.85;
    } else {
      utterance.rate = 0.95;
      utterance.pitch = 1.05;
    }

    utterance.onend = () => setSpeakingId(null);
    utterance.onerror = () => setSpeakingId(null);

    setSpeakingId(id);
    window.speechSynthesis.speak(utterance);
  };

  const handleClearSession = () => {
    if (window.confirm('Mulai sesi terapi baru? Riwayat obrolan saat ini akan diarsipkan.')) {
      window.speechSynthesis?.cancel();
      localStorage.removeItem('rational_mind_chat_history_v2');
      window.location.reload();
    }
  };

  const handleExportChat = () => {
    const textContent = messages
      .map(
        (m) =>
          `[${m.timestamp}] ${
            m.role === 'user' ? 'KONSULI (Anda)' : `TERAPIS (${m.persona || selectedPersona})`
          }:\n${m.text}\n`
      )
      .join('\n---\n\n');

    const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Sesi-Konseling-Rational-Mind-${new Date().toISOString().slice(0, 10)}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-4xl mx-auto flex flex-col h-[calc(100vh-140px)] min-h-[580px] bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden animate-fadeIn">
      {/* Top Transition Bar: Back to Halaman 1 */}
      <div className="bg-slate-950 px-4 sm:px-6 py-2.5 flex items-center justify-between border-b border-slate-800 text-xs text-slate-300">
        <div className="flex items-center gap-2">
          {onBackToMenu && (
            <button
              onClick={onBackToMenu}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-800 hover:bg-slate-700 text-teal-300 font-bold transition border border-slate-700 shadow-xs cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>[Halaman 1: Kamus Rahasia]</span>
            </button>
          )}
          <span className="hidden sm:inline-block text-[11px] text-slate-400">
            • [HALAMAN 2: TERAPI CHAT AKTIF]
          </span>
        </div>

        <div className="text-[11px] text-slate-400">
          Ketik <strong>"BUKA APLIKASI"</strong> kapan saja untuk kembali ke Menu Rahasia
        </div>
      </div>

      {/* Persona Selection Header */}
      <div className="bg-slate-900 text-white px-4 sm:px-6 py-3 border-b border-slate-800 shrink-0">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center space-x-2">
            <UserCheck className="w-4 h-4 text-teal-400" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Terapis Aktif:
            </span>
          </div>

          {/* Interactive Persona Tabs with Real Photos */}
          <div className="flex items-center gap-2">
            {/* Maudy Button */}
            <button
              onClick={() => handleSelectPersona('MAUDY')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-2xl text-xs font-bold transition border cursor-pointer ${
                selectedPersona === 'MAUDY'
                  ? 'border-emerald-400 bg-emerald-950/80 text-emerald-200 shadow-sm ring-1 ring-emerald-400'
                  : 'border-slate-700 bg-slate-800/80 text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <img
                src={personaDetails.MAUDY.avatar}
                alt="Maudy Ayunda"
                className="w-6 h-6 rounded-full object-cover object-top border border-emerald-400"
              />
              <div className="text-left">
                <span className="block leading-none">Maudy</span>
                <span className="text-[9px] text-emerald-300 font-normal">Empatik • Aku-Kamu</span>
              </div>
            </button>

            {/* Benedict Button */}
            <button
              onClick={() => handleSelectPersona('BENEDICT')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-2xl text-xs font-bold transition border cursor-pointer ${
                selectedPersona === 'BENEDICT'
                  ? 'border-indigo-400 bg-indigo-950/80 text-indigo-200 shadow-sm ring-1 ring-indigo-400'
                  : 'border-slate-700 bg-slate-800/80 text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <img
                src={personaDetails.BENEDICT.avatar}
                alt="Benedict Cumberbatch"
                className="w-6 h-6 rounded-full object-cover object-top border border-indigo-400"
              />
              <div className="text-left">
                <span className="block leading-none">Benedict</span>
                <span className="text-[9px] text-indigo-300 font-normal">Sherlock • Saya-Anda</span>
              </div>
            </button>

            {/* Actions */}
            <div className="flex items-center ml-auto sm:ml-2 pl-2 border-l border-slate-700 space-x-1">
              <button
                onClick={handleExportChat}
                className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
                title="Ekspor Catatan Konseling"
              >
                <Download className="w-4 h-4" />
              </button>
              <button
                onClick={handleClearSession}
                className="p-1.5 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition"
                title="Sesi Terapi Baru"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Current Persona Bio Tag */}
        <div className="mt-2 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-300">
          <div className="flex items-center gap-2">
            <span
              className={`inline-block w-2 h-2 rounded-full ${
                selectedPersona === 'MAUDY' ? 'bg-emerald-400' : 'bg-indigo-400'
              } animate-pulse`}
            />
            <span>
              Aktif: <strong>{personaDetails[selectedPersona].name}</strong> ({personaDetails[selectedPersona].role})
            </span>
          </div>
          <span className="hidden sm:inline text-slate-400 italic">
            {personaDetails[selectedPersona].style}
          </span>
        </div>
      </div>

      {/* Therapy Dialogue Container */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 bg-slate-50/50">
        {messages.map((msg) => {
          const isUser = msg.role === 'user';
          const msgPersona = msg.persona || selectedPersona;
          const details = personaDetails[msgPersona];
          const parsed: ParsedTherapySections =
            msg.parsed || parseTherapyResponse(msg.text);

          if (isUser) {
            return (
              <div key={msg.id} className="flex justify-end">
                <div className="max-w-[85%] sm:max-w-lg bg-teal-800 text-white rounded-3xl rounded-tr-xs p-4 shadow-sm text-sm space-y-1">
                  <p className="leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                  <p className="text-[10px] text-teal-300/80 text-right">{msg.timestamp}</p>
                </div>
              </div>
            );
          }

          // Clinical Model Response with Persona Profile & 4 Structured Cards
          return (
            <div key={msg.id} className="flex flex-col space-y-3 max-w-2xl">
              {/* Doctor Header Badge with Photo */}
              <div className="flex items-center justify-between text-xs text-slate-500 px-1">
                <div className="flex items-center gap-2.5">
                  <img
                    src={details.avatar}
                    alt={details.name}
                    className="w-7 h-7 rounded-full object-cover object-top border-2 border-slate-300 shadow-xs"
                  />
                  <div>
                    <span className="font-bold text-slate-900 block leading-tight">
                      {details.name}
                    </span>
                    <span className="text-[10px] text-teal-800 font-medium">
                      {details.role}
                    </span>
                  </div>
                </div>
                <span className="text-[10px] text-slate-600 font-mono">{msg.timestamp}</span>
              </div>

              {/* 1. Validation & Empathy Card */}
              {parsed.validation && (
                <div
                  className={`rounded-2xl border p-4 space-y-1.5 shadow-xs ${
                    msgPersona === 'BENEDICT'
                      ? 'border-indigo-200/90 bg-indigo-50/60'
                      : 'border-rose-200/90 bg-rose-50/70'
                  }`}
                >
                  <div
                    className={`flex items-center gap-2 text-xs font-bold uppercase tracking-wider ${
                      msgPersona === 'BENEDICT' ? 'text-indigo-900' : 'text-rose-800'
                    }`}
                  >
                    <Heart
                      className={`w-4 h-4 ${
                        msgPersona === 'BENEDICT'
                          ? 'text-indigo-600 fill-indigo-100'
                          : 'text-rose-500 fill-rose-100'
                      }`}
                    />
                    <span>Validasi Emosi / Penerimaan Awal</span>
                  </div>
                  <p
                    className={`text-xs sm:text-sm leading-relaxed ${
                      msgPersona === 'BENEDICT' ? 'text-indigo-950 font-medium' : 'text-rose-950'
                    }`}
                  >
                    {parsed.validation}
                  </p>
                </div>
              )}

              {/* 2. Rational Analysis / Debunk Card */}
              {parsed.rational && (
                <div className="rounded-2xl border border-slate-200 bg-white p-4 space-y-2 shadow-xs">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-slate-900 text-xs font-bold uppercase tracking-wider">
                      <Brain className="w-4 h-4 text-teal-600" />
                      <span>Analisis Rasional / Pematahan Mitos Zodiak</span>
                    </div>

                    {parsed.biasesDetected.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {parsed.biasesDetected.map((bias) => (
                          <span
                            key={bias}
                            className="text-[10px] font-bold bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full border border-slate-200"
                          >
                            {bias}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <p className="text-xs sm:text-sm text-slate-800 leading-relaxed whitespace-pre-wrap">
                    {parsed.rational}
                  </p>
                </div>
              )}

              {/* 3. Physical Grounding Card */}
              {parsed.grounding && (
                <div className="rounded-2xl border border-teal-200 bg-teal-50/80 p-4 space-y-2.5 shadow-xs">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-teal-900 text-xs font-bold uppercase tracking-wider">
                      <Wind className="w-4 h-4 text-teal-600" />
                      <span>Latihan Grounding Fisik (Pernapasan / Fokus)</span>
                    </div>

                    <button
                      onClick={onOpenGrounding}
                      className="inline-flex items-center gap-1 text-[11px] font-bold text-teal-800 hover:text-teal-950 bg-teal-200/60 hover:bg-teal-200 px-2.5 py-1 rounded-lg transition"
                    >
                      Buka Pacer Napas
                      <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>

                  <p className="text-xs sm:text-sm text-teal-950 leading-relaxed whitespace-pre-wrap">
                    {parsed.grounding}
                  </p>
                </div>
              )}

              {/* 4. Logical Action Plan Card */}
              {parsed.actionPlan && (
                <div className="rounded-2xl border border-amber-200 bg-amber-50/60 p-4 space-y-2.5 shadow-xs">
                  <div className="flex items-center gap-2 text-amber-900 text-xs font-bold uppercase tracking-wider">
                    <CheckSquare className="w-4 h-4 text-amber-600" />
                    <span>Action Plan Logis Hari Ini</span>
                  </div>

                  {parsed.actionItems.length > 0 ? (
                    <div className="space-y-1.5 pt-1">
                      {parsed.actionItems.map((item) => (
                        <div
                          key={item.id}
                          onClick={() => handleToggleActionItem(msg.id, item.id)}
                          className={`flex items-start gap-2.5 p-2 rounded-xl text-xs sm:text-sm transition cursor-pointer ${
                            item.done
                              ? 'bg-amber-100/80 text-amber-900 line-through'
                              : 'bg-white/90 text-slate-800 hover:bg-white border border-amber-200/50'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={item.done}
                            onChange={() => {}}
                            className="mt-0.5 accent-amber-600 rounded cursor-pointer"
                          />
                          <span className="leading-snug">{item.text}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs sm:text-sm text-amber-950 leading-relaxed whitespace-pre-wrap">
                      {parsed.actionPlan}
                    </p>
                  )}
                </div>
              )}

              {/* Message Toolbar */}
              <div className="flex items-center gap-2 pt-1 text-slate-400 text-xs">
                <button
                  onClick={() => handleSpeak(msg.id, msg.text, msgPersona)}
                  className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg hover:bg-slate-200/60 transition ${
                    speakingId === msg.id ? 'text-teal-700 bg-teal-100 font-bold' : 'text-slate-500'
                  }`}
                  title="Dengarkan Suara Terapi"
                >
                  {speakingId === msg.id ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                  <span className="text-[11px]">{speakingId === msg.id ? 'Berhenti' : 'Dengarkan Suara'}</span>
                </button>

                <button
                  onClick={() => handleCopy(msg.id, msg.text)}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-slate-500 hover:bg-slate-200/60 transition"
                  title="Salin Respon"
                >
                  {copiedId === msg.id ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span className="text-[11px]">{copiedId === msg.id ? 'Tersalin' : 'Salin'}</span>
                </button>

                {onOpenWorksheetWithPrompt && (
                  <button
                    onClick={() => onOpenWorksheetWithPrompt(parsed.rational || msg.text)}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-slate-500 hover:bg-slate-200/60 transition"
                    title="Bawa ke Jurnal CBT"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    <span className="text-[11px]">Bawa ke Jurnal CBT</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}

        {/* Loading Indicator */}
        {isLoading && (
          <div className="flex flex-col space-y-2 max-w-sm">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
              <img
                src={personaDetails[selectedPersona].avatar}
                alt={personaDetails[selectedPersona].name}
                className="w-5 h-5 rounded-full object-cover object-top border border-slate-300"
              />
              <span>{personaDetails[selectedPersona].name} sedang merumuskan respons...</span>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center space-x-2">
              <div
                className={`w-2.5 h-2.5 ${
                  selectedPersona === 'MAUDY' ? 'bg-emerald-500' : 'bg-indigo-500'
                } rounded-full animate-bounce [animation-delay:-0.3s]`}
              />
              <div
                className={`w-2.5 h-2.5 ${
                  selectedPersona === 'MAUDY' ? 'bg-emerald-400' : 'bg-indigo-400'
                } rounded-full animate-bounce [animation-delay:-0.15s]`}
              />
              <div
                className={`w-2.5 h-2.5 ${
                  selectedPersona === 'MAUDY' ? 'bg-emerald-300' : 'bg-indigo-300'
                } rounded-full animate-bounce`}
              />
              <span className="text-xs text-slate-500 pl-2">
                Membedah mitos & menyusun action plan...
              </span>
            </div>
          </div>
        )}

        {/* Error Notification */}
        {errorMsg && (
          <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{errorMsg}</span>
            </div>
            <button
              onClick={() => handleSendMessage()}
              className="font-bold underline ml-2 hover:text-rose-950"
            >
              Coba Lagi
            </button>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggestion Chips */}
      {messages.length <= 2 && (
        <div className="px-4 py-2 bg-slate-100/70 border-t border-slate-200 overflow-x-auto flex gap-2 shrink-0">
          <span className="text-[11px] font-bold text-slate-500 self-center shrink-0 pr-1">
            Contoh [{selectedPersona}]:
          </span>
          {promptSuggestions[selectedPersona].map((item, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(item.query)}
              className="text-[11px] font-semibold text-slate-700 bg-white hover:bg-teal-50 hover:text-teal-900 border border-slate-200 hover:border-teal-300 px-3 py-1 rounded-full shrink-0 transition flex items-center gap-1.5 shadow-2xs"
            >
              <span>{item.emoji}</span>
              <span>{item.title}</span>
            </button>
          ))}
        </div>
      )}

      {/* Input Form */}
      <div className="p-3 sm:p-4 bg-white border-t border-slate-200 shrink-0">
        <div className="relative flex items-end gap-2 bg-slate-50 rounded-2xl border border-slate-200 p-2 focus-within:border-teal-500 focus-within:ring-2 focus-within:ring-teal-100 transition">
          <textarea
            ref={textareaRef}
            rows={2}
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={`Curhatkan kecemasan zodiakmu kepada ${personaDetails[selectedPersona].name}... (Tekan Enter untuk kirim)`}
            className="w-full bg-transparent text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 outline-none resize-none max-h-32 px-1"
          />

          <button
            onClick={() => handleSendMessage()}
            disabled={!inputMessage.trim() || isLoading}
            className={`p-2.5 rounded-xl transition shrink-0 ${
              inputMessage.trim() && !isLoading
                ? selectedPersona === 'MAUDY'
                  ? 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm cursor-pointer'
                  : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm cursor-pointer'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
            title={`Kirim Pesan ke ${personaDetails[selectedPersona].name}`}
            aria-label={`Kirim Pesan ke ${personaDetails[selectedPersona].name}`}
          >
            <Send className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-center justify-between text-[11px] text-slate-500 mt-2 px-1">
          <span>Format: [{selectedPersona}] - [Curhatan Anda]</span>
          <span className="flex items-center gap-1 text-slate-600">
            <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
            Privasi terlindungi • Berbasis Sains Kognitif
          </span>
        </div>
      </div>
    </div>
  );
};
