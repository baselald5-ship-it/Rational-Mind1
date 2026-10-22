import React, { useState, useEffect, useRef } from 'react';
import { Wind, Play, Pause, RotateCcw, CheckCircle2, Sparkles, Heart, Compass } from 'lucide-react';

interface BreathingStudioProps {
  initialMode?: '4-7-8' | 'box' | 'coherence' | '5-4-3-2-1';
}

type Technique = '4-7-8' | 'box' | 'coherence';

export const BreathingStudio: React.FC<BreathingStudioProps> = ({ initialMode = '4-7-8' }) => {
  const [activeTab, setActiveTab] = useState<'breath' | 'sensory'>(
    initialMode === '5-4-3-2-1' ? 'sensory' : 'breath'
  );
  const [technique, setTechnique] = useState<Technique>(
    initialMode === '5-4-3-2-1' ? '4-7-8' : (initialMode as Technique)
  );

  // Breathing state
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState<'inhale' | 'hold' | 'exhale' | 'holdEmpty'>('inhale');
  const [secondsLeft, setSecondsLeft] = useState(4);
  const [cyclesCompleted, setCyclesCompleted] = useState(0);

  // Sensory 5-4-3-2-1 state
  const [sensoryChecked, setSensoryChecked] = useState<{ [key: string]: boolean }>({});

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const configs: Record<Technique, {
    title: string;
    description: string;
    inhale: number;
    hold: number;
    exhale: number;
    holdEmpty: number;
  }> = {
    '4-7-8': {
      title: 'Pernapasan 4-7-8 (Relaksasi Vagal)',
      description: 'Metode Dr. Andrew Weil yang terbukti menurunkan ritme detak jantung dan mengaktifkan saraf parasimpatis.',
      inhale: 4,
      hold: 7,
      exhale: 8,
      holdEmpty: 0,
    },
    'box': {
      title: 'Box Breathing (4-4-4-4)',
      description: 'Digunakan oleh praktisi klinis dan responder darurat untuk meredakan kecemasan akut dan mengembalikan fokus.',
      inhale: 4,
      hold: 4,
      exhale: 4,
      holdEmpty: 4,
    },
    'coherence': {
      title: 'Pernapasan Koherensi (5-5)',
      description: 'Menyeimbangkan variabilitas detak jantung (HRV) untuk stabilitas emosional yang konsisten.',
      inhale: 5,
      hold: 0,
      exhale: 5,
      holdEmpty: 0,
    },
  };

  const currentConfig = configs[technique];

  // Engine for breathing
  useEffect(() => {
    if (!isActive) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev > 1) {
          return prev - 1;
        }

        // Transition phases
        if (phase === 'inhale') {
          if (currentConfig.hold > 0) {
            setPhase('hold');
            return currentConfig.hold;
          } else {
            setPhase('exhale');
            return currentConfig.exhale;
          }
        } else if (phase === 'hold') {
          setPhase('exhale');
          return currentConfig.exhale;
        } else if (phase === 'exhale') {
          if (currentConfig.holdEmpty > 0) {
            setPhase('holdEmpty');
            return currentConfig.holdEmpty;
          } else {
            setCyclesCompleted((c) => c + 1);
            setPhase('inhale');
            return currentConfig.inhale;
          }
        } else if (phase === 'holdEmpty') {
          setCyclesCompleted((c) => c + 1);
          setPhase('inhale');
          return currentConfig.inhale;
        }
        return 4;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isActive, phase, technique, currentConfig]);

  const startBreathing = () => {
    setPhase('inhale');
    setSecondsLeft(currentConfig.inhale);
    setIsActive(true);
  };

  const pauseBreathing = () => {
    setIsActive(false);
  };

  const resetBreathing = () => {
    setIsActive(false);
    setPhase('inhale');
    setSecondsLeft(currentConfig.inhale);
    setCyclesCompleted(0);
  };

  const handleTechniqueChange = (tech: Technique) => {
    setTechnique(tech);
    setIsActive(false);
    setPhase('inhale');
    setSecondsLeft(configs[tech].inhale);
    setCyclesCompleted(0);
  };

  const phaseInstruction = {
    inhale: { label: 'Tarik Napas Lewat Hidung', color: 'from-teal-400 to-emerald-500', scale: 'scale-110' },
    hold: { label: 'Tahan Napas dengan Rileks', color: 'from-indigo-400 to-teal-500', scale: 'scale-110' },
    exhale: { label: 'Hembuskan Perlahan Lewat Mulut', color: 'from-emerald-500 to-cyan-500', scale: 'scale-75' },
    holdEmpty: { label: 'Jeda Kosong Sejenak', color: 'from-slate-400 to-teal-600', scale: 'scale-75' },
  }[phase];

  const sensorySteps = [
    { count: 5, label: 'Benda yang dapat kamu LIHAT', desc: 'Perhatikan 5 objek di sekitarmu: warna dinding, bayangan cahaya, jam dinding, bentuk benda, atau detail di mejamu.' },
    { count: 4, label: 'Tekstur yang dapat kamu RABA', desc: 'Sentuh 4 permukaan nyata: serat kain pakaianmu, dinginnya permukaan meja, kulit tanganmu, atau lantai di bawah kakimu.' },
    { count: 3, label: 'Suara yang dapat kamu DENGAR', desc: 'Dengarkan 3 suara: deru kendaraan jauh, hembusan AC/kipas angin, atau detak halus napasmu.' },
    { count: 2, label: 'Aroma yang dapat kamu CIUM', desc: 'Hiduplah 2 aroma: aroma sabun di tanganmu, wangi kopi/teh, atau aroma udara di sekitarmu.' },
    { count: 1, label: 'Kebenaran Nyata tentang Dirimu', desc: 'Katakan dalam hatimu: "Aku aman di saat ini. Takdirku dipegang oleh pilihanku hari ini, bukan ramalan bintang."' },
  ];

  const toggleSensoryItem = (key: string) => {
    setSensoryChecked((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Studio Header */}
      <div className="bg-gradient-to-br from-teal-800 via-teal-900 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 text-teal-200 text-xs font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              Regulasi Sistem Saraf Mandiri
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Studio Grounding & Pernapasan Rasional
            </h2>
            <p className="text-sm text-teal-100/90 mt-1 max-w-xl">
              Ketika otakmu dibanjiri kecemasan akibat ramalan zodiak atau sugesti nasib sial, sistem saraf amygdala sedang terpicu. Latihan pernapasan dan grounding fisik ini secara biologis meredakan hormon stres.
            </p>
          </div>

          {/* Tab Selector */}
          <div className="flex bg-slate-800/80 p-1.5 rounded-2xl border border-teal-500/30 shrink-0 self-start md:self-auto">
            <button
              onClick={() => setActiveTab('breath')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition ${
                activeTab === 'breath'
                  ? 'bg-teal-500 text-slate-950 shadow-md'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Wind className="w-4 h-4" />
              Latihan Pernapasan
            </button>
            <button
              onClick={() => setActiveTab('sensory')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition ${
                activeTab === 'sensory'
                  ? 'bg-teal-500 text-slate-950 shadow-md'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Compass className="w-4 h-4" />
              Grounding 5-4-3-2-1
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      {activeTab === 'breath' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Visual Breathing Pacer Canvas */}
          <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm flex flex-col items-center justify-center min-h-[460px] relative">
            {/* Technique Pills */}
            <div className="flex flex-wrap gap-2 justify-center mb-6">
              {(['4-7-8', 'box', 'coherence'] as const).map((tech) => (
                <button
                  key={tech}
                  onClick={() => handleTechniqueChange(tech)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold transition ${
                    technique === tech
                      ? 'bg-teal-700 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {tech === '4-7-8' ? '4-7-8 Relaksasi' : tech === 'box' ? 'Box Breathing (4-4-4-4)' : 'Koherensi (5-5)'}
                </button>
              ))}
            </div>

            {/* Glowing animated circle */}
            <div className="relative flex items-center justify-center my-6">
              <div
                className={`w-56 h-56 sm:w-64 sm:h-64 rounded-full bg-gradient-to-tr ${phaseInstruction.color} opacity-20 blur-2xl transition-all duration-1000 ${
                  isActive ? phaseInstruction.scale : 'scale-90'
                }`}
              />

              <div
                className={`w-48 h-48 sm:w-56 sm:h-56 rounded-full border-4 border-teal-500/30 bg-teal-50/50 flex flex-col items-center justify-center shadow-inner relative transition-transform duration-1000 ${
                  isActive ? phaseInstruction.scale : 'scale-100'
                }`}
              >
                <span className="text-4xl sm:text-5xl font-black text-slate-800 font-mono tracking-tighter">
                  {secondsLeft}s
                </span>
                <span className="text-xs sm:text-sm font-bold text-teal-800 text-center px-4 mt-2 transition-all">
                  {isActive ? phaseInstruction.label : 'Tekan Mulai'}
                </span>
              </div>
            </div>

            {/* Cycles counter */}
            <div className="text-xs font-semibold text-slate-600 mb-6 flex items-center gap-1.5 bg-slate-100 px-3 py-1 rounded-full">
              <Heart className="w-3.5 h-3.5 text-rose-500" />
              Siklus Selesai: <span className="font-bold text-slate-900">{cyclesCompleted} putaran</span>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-3">
              {!isActive ? (
                <button
                  onClick={startBreathing}
                  className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-6 py-2.5 rounded-2xl font-bold text-sm shadow-md transition transform active:scale-95"
                >
                  <Play className="w-4 h-4 fill-current" />
                  Mulai Latihan
                </button>
              ) : (
                <button
                  onClick={pauseBreathing}
                  className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-slate-950 px-6 py-2.5 rounded-2xl font-bold text-sm shadow-md transition transform active:scale-95"
                >
                  <Pause className="w-4 h-4 fill-current" />
                  Jeda
                </button>
              )}

              <button
                onClick={resetBreathing}
                className="p-2.5 rounded-2xl border border-slate-200 text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition"
                title="Reset Hitungan"
                aria-label="Reset Hitungan"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Technique explanation & scientific tips */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
              <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                <Wind className="w-4 h-4 text-teal-600" />
                {currentConfig.title}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {currentConfig.description}
              </p>

              <div className="space-y-2 border-t border-slate-100 pt-3 text-xs">
                <div className="flex justify-between py-1 border-b border-slate-50">
                  <span className="text-slate-500">Tarik Napas:</span>
                  <span className="font-bold text-teal-700">{currentConfig.inhale} detik</span>
                </div>
                {currentConfig.hold > 0 && (
                  <div className="flex justify-between py-1 border-b border-slate-50">
                    <span className="text-slate-500">Tahan Napas:</span>
                    <span className="font-bold text-teal-700">{currentConfig.hold} detik</span>
                  </div>
                )}
                <div className="flex justify-between py-1 border-b border-slate-50">
                  <span className="text-slate-500">Hembuskan:</span>
                  <span className="font-bold text-teal-700">{currentConfig.exhale} detik</span>
                </div>
                {currentConfig.holdEmpty > 0 && (
                  <div className="flex justify-between py-1 border-b border-slate-50">
                    <span className="text-slate-500">Jeda Kosong:</span>
                    <span className="font-bold text-teal-700">{currentConfig.holdEmpty} detik</span>
                  </div>
                )}
              </div>

              <div className="rounded-2xl bg-teal-50/70 p-3.5 border border-teal-100 text-[11px] text-teal-900 leading-relaxed">
                💡 <strong>Mengapa ini penting?</strong> Menghembuskan napas lebih panjang daripada menarik napas merangsang saraf vagus, memberi sinyal ke jantung untuk memperlambat detak, sehingga otak berpikir jernih kembali.
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Sensory 5-4-3-2-1 Guide */
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="max-w-2xl">
            <h3 className="text-xl font-bold text-slate-900">
              Teknik Grounding Sensori 5-4-3-2-1
            </h3>
            <p className="text-xs text-slate-600 mt-1">
              Ketika pikiranmu terjebak dalam katastrofi zodiak ("Pasti minggu ini sial", "Karierku bakal hancur"), bawa kembali perhatian otakmu ke momen fisik nyata dengan memeriksa 5 indramu:
            </p>
          </div>

          <div className="space-y-4">
            {sensorySteps.map((step) => {
              const key = `sensory-${step.count}`;
              const isDone = sensoryChecked[key];
              return (
                <div
                  key={key}
                  onClick={() => toggleSensoryItem(key)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-4 ${
                    isDone
                      ? 'bg-teal-50/80 border-teal-300 text-teal-950'
                      : 'bg-slate-50 hover:bg-slate-100/70 border-slate-200'
                  }`}
                >
                  <div className="shrink-0 pt-0.5">
                    {isDone ? (
                      <CheckCircle2 className="w-5 h-5 text-teal-600 fill-teal-100" />
                    ) : (
                      <div className="w-5 h-5 rounded-full border-2 border-slate-300 flex items-center justify-center font-bold text-[10px] text-slate-600">
                        {step.count}
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                      <span className="w-5 h-5 rounded-md bg-teal-100 text-teal-800 text-xs font-bold inline-flex items-center justify-center">
                        {step.count}
                      </span>
                      {step.label}
                    </h4>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-center justify-between">
            <span>
              Telah menyelesaikan grounding? Lakukan 1 tindakan nyata dari action plan konselingmu.
            </span>
            <button
              onClick={() => setSensoryChecked({})}
              className="px-3 py-1 text-[11px] font-bold text-amber-800 bg-amber-200/70 hover:bg-amber-200 rounded-lg transition"
            >
              Reset Checklist
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
