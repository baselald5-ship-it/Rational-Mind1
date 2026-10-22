import React, { useState, useEffect } from 'react';
import { Brain, Sparkles, CheckCircle, Trash2, BookOpen, AlertCircle, TrendingDown } from 'lucide-react';
import confetti from 'canvas-confetti';
import { CBTJournalEntry } from '../types';

export const CBTWorksheet: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'worksheet' | 'journal'>('worksheet');

  // Form states
  const [triggerThought, setTriggerThought] = useState('');
  const [selectedDistortions, setSelectedDistortions] = useState<string[]>([]);
  const [objectiveEvidence, setObjectiveEvidence] = useState('');
  const [rationalReframing, setRationalReframing] = useState('');
  const [actionSteps, setActionSteps] = useState('');
  const [anxietyBefore, setAnxietyBefore] = useState(7);
  const [anxietyAfter, setAnxietyAfter] = useState(3);

  // Journal entries
  const [entries, setEntries] = useState<CBTJournalEntry[]>([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('rational_mind_cbt_journal');
      if (saved) {
        setEntries(JSON.parse(saved));
      } else {
        // Pre-populate with one sample entry to show value
        const sample: CBTJournalEntry = {
          id: 'sample-1',
          createdAt: new Date().toLocaleDateString('id-ID', { dateStyle: 'medium' }),
          triggerThought: 'Ramalan zodiak minggu ini bilang karier bakal sial dan hancur, jadi takut presentasi UTS.',
          selectedDistortions: ['Catastrophizing', 'Confirmation Bias', 'External Locus of Control'],
          objectiveEvidence: 'Slide presentasi sudah selesai disusun 80%. Dosen menilai berdasarkan substansi materi, bukan pergerakan orbit planet di luar angkasa.',
          rationalReframing: 'Kecemasanku adalah stres akademik yang wajar, bukan pertanda kosmik. Aku bisa mengontrol nilai dengan latihan presentasi 2 kali lagi.',
          actionSteps: '1. Matikan medsos 2 jam. 2. Latihan simulasi presentasi di depan cermin selama 15 menit.',
          anxietyBefore: 8,
          anxietyAfter: 3,
        };
        setEntries([sample]);
      }
    } catch {
      // Ignore
    }
  }, []);

  const saveEntries = (newEntries: CBTJournalEntry[]) => {
    setEntries(newEntries);
    try {
      localStorage.setItem('rational_mind_cbt_journal', JSON.stringify(newEntries));
    } catch {
      // Ignore
    }
  };

  const distortionOptions = [
    { id: 'Barnum Effect', label: 'Efek Barnum', desc: 'Mempercayai kalimat ramalan umum yang bisa dialami semua orang.' },
    { id: 'Confirmation Bias', label: 'Konfirmasi Bias', desc: 'Hanya mengingat ramalan yang kebetulan pas dan lupa ratusan yang salah.' },
    { id: 'Catastrophizing', label: 'Katastrofik (Membayangkan Kehancuran)', desc: 'Mengira 1 ramalan buruk pasti menghancurkan seluruh masa depan.' },
    { id: 'External Locus of Control', label: 'Pasrah Takdir (Locus Eksternal)', desc: 'Menganggap usaha kita percuma karena nasib sudah diatur bintang.' },
    { id: 'Emotional Reasoning', label: 'Penalaran Emosional', desc: 'Merasa ramalan itu benar hanya karena kita sedang merasa cemas/takut.' },
    { id: 'Self-Fulfilling Prophecy', label: 'Ramalan yang Terwujud Sendiri', desc: 'Kecemasan membuat kita ceroboh, lalu menyalahkan zodiak.' },
  ];

  const toggleDistortion = (id: string) => {
    setSelectedDistortions((prev) =>
      prev.includes(id) ? prev.filter((d) => d !== id) : [...prev, id]
    );
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!triggerThought.trim() || !rationalReframing.trim()) return;

    const newEntry: CBTJournalEntry = {
      id: `cbt-${Date.now()}`,
      createdAt: new Date().toLocaleDateString('id-ID', { dateStyle: 'medium' }),
      triggerThought,
      selectedDistortions,
      objectiveEvidence,
      rationalReframing,
      actionSteps,
      anxietyBefore,
      anxietyAfter,
    };

    const updated = [newEntry, ...entries];
    saveEntries(updated);

    // Fire confetti celebration
    try {
      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#0d9488', '#14b8a6', '#0f766e', '#38bdf8'],
      });
    } catch {
      // Ignore
    }

    // Reset form
    setTriggerThought('');
    setSelectedDistortions([]);
    setObjectiveEvidence('');
    setRationalReframing('');
    setActionSteps('');
    setAnxietyBefore(7);
    setAnxietyAfter(3);
    setActiveTab('journal');
  };

  const handleDelete = (id: string) => {
    const filtered = entries.filter((item) => item.id !== id);
    saveEntries(filtered);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Worksheet Header */}
      <div className="bg-gradient-to-r from-teal-900 via-slate-800 to-indigo-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 text-teal-200 text-xs font-semibold mb-2">
              <Brain className="w-3.5 h-3.5" />
              Metode Restrukturisasi Kognitif CBT
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Lembar Kerja & Jurnal Anti-Cocoklogi
            </h2>
            <p className="text-sm text-teal-100/90 mt-1 max-w-xl">
              Ubah sugesti ramalan mistis yang memicu cemas menjadi fakta logis yang bisa kamu kendalikan.
            </p>
          </div>

          <div className="flex bg-slate-800/80 p-1.5 rounded-2xl border border-teal-500/30 shrink-0 self-start md:self-auto">
            <button
              onClick={() => setActiveTab('worksheet')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition ${
                activeTab === 'worksheet'
                  ? 'bg-teal-500 text-slate-950 shadow-md'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Brain className="w-4 h-4" />
              Tulis Refleksi Baru
            </button>
            <button
              onClick={() => setActiveTab('journal')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition ${
                activeTab === 'journal'
                  ? 'bg-teal-500 text-slate-950 shadow-md'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              Jurnal Tersimpan ({entries.length})
            </button>
          </div>
        </div>
      </div>

      {activeTab === 'worksheet' ? (
        <form onSubmit={handleSave} className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          {/* Step 1 */}
          <div className="space-y-2">
            <label className="block text-sm font-bold text-slate-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-teal-100 text-teal-800 text-xs font-bold inline-flex items-center justify-center">
                1
              </span>
              Pikiran Otomatis / Ramalan yang Memicu Kecemasanmu
            </label>
            <p className="text-xs text-slate-500">
              Contoh: "Zodiak bilang hubungan kita ga bakal langgeng karena elemen api & air", atau "Minggu ini bakal sial terus".
            </p>
            <textarea
              required
              rows={3}
              value={triggerThought}
              onChange={(e) => setTriggerThought(e.target.value)}
              placeholder="Tuliskan ramalan atau asumsi mistis yang membuatmu cemas..."
              className="w-full rounded-2xl border border-slate-200 p-3.5 text-sm focus:border-teal-500 focus:ring-2 focus:ring-teal-100 outline-none transition"
            />
          </div>

          {/* Step 2 */}
          <div className="space-y-3">
            <label className="block text-sm font-bold text-slate-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-teal-100 text-teal-800 text-xs font-bold inline-flex items-center justify-center">
                2
              </span>
              Identifikasi Distorsi Kognitif & Efek Cocoklogi
            </label>
            <p className="text-xs text-slate-500">
              Pilih pola pikir bias yang paling relevan dengan kecemasan di atas:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
              {distortionOptions.map((opt) => {
                const selected = selectedDistortions.includes(opt.id);
                return (
                  <button
                    type="button"
                    key={opt.id}
                    onClick={() => toggleDistortion(opt.id)}
                    className={`p-3 rounded-2xl border text-left transition ${
                      selected
                        ? 'border-teal-500 bg-teal-50/70 text-teal-950 ring-1 ring-teal-500'
                        : 'border-slate-200 bg-slate-50/50 hover:bg-slate-100 text-slate-700'
                    }`}
                  >
                    <div className="font-bold text-xs flex items-center justify-between">
                      <span>{opt.label}</span>
                      {selected && <CheckCircle className="w-3.5 h-3.5 text-teal-600" />}
                    </div>
                    <p className="text-[11px] text-slate-500 mt-1 leading-snug">{opt.desc}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 3 */}
          <div className="space-y-2">
            <label className="block text-sm font-bold text-slate-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-teal-100 text-teal-800 text-xs font-bold inline-flex items-center justify-center">
                3
              </span>
              Uji Bukti Nyata (Fakta Objektif vs Asumsi Kosmik)
            </label>
            <p className="text-xs text-slate-500">
              Apa fakta riil yang kamu miliki sekarang? Apa yang sebenarnya bisa kamu amati dan buktikan?
            </p>
            <textarea
              rows={2}
              value={objectiveEvidence}
              onChange={(e) => setObjectiveEvidence(e.target.value)}
              placeholder="Contoh: Masalah kami adalah komunikasi yang jarang, bukan letak bintang. Nilai UTS ditentukan dari jam belajarku..."
              className="w-full rounded-2xl border border-slate-200 p-3.5 text-sm focus:border-teal-500 focus:ring-2 focus:ring-teal-100 outline-none transition"
            />
          </div>

          {/* Step 4 */}
          <div className="space-y-2">
            <label className="block text-sm font-bold text-slate-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-teal-100 text-teal-800 text-xs font-bold inline-flex items-center justify-center">
                4
              </span>
              Rekonstruksi Pikiran Rasional & Aksi Logis Hari Ini
            </label>
            <p className="text-xs text-slate-500">
              Rumuskan cara pandang yang lebih objektif dan 1-2 langkah konkret yang bisa kamu ambil sekarang.
            </p>
            <textarea
              required
              rows={3}
              value={rationalReframing}
              onChange={(e) => setRationalReframing(e.target.value)}
              placeholder="Pikiran rasional baruku: Aku memegang kendali atas reaksiku..."
              className="w-full rounded-2xl border border-slate-200 p-3.5 text-sm focus:border-teal-500 focus:ring-2 focus:ring-teal-100 outline-none transition"
            />
          </div>

          {/* Anxiety Level Sliders */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <div>
              <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                <span>Tingkat Cemas Sebelum (1 - 10):</span>
                <span className="text-rose-600 font-extrabold">{anxietyBefore}/10</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                value={anxietyBefore}
                onChange={(e) => setAnxietyBefore(parseInt(e.target.value))}
                className="w-full accent-rose-500"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                <span>Tingkat Cemas Sesudah Reframing:</span>
                <span className="text-teal-600 font-extrabold">{anxietyAfter}/10</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                value={anxietyAfter}
                onChange={(e) => setAnxietyAfter(parseInt(e.target.value))}
                className="w-full accent-teal-600"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 px-6 rounded-2xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            Simpan Refleksi Rasional ke Jurnal
          </button>
        </form>
      ) : (
        /* Journal Entries List */
        <div className="space-y-4">
          {entries.length === 0 ? (
            <div className="bg-white rounded-3xl p-10 text-center border border-slate-200 shadow-sm space-y-3">
              <BookOpen className="w-10 h-10 text-slate-400 mx-auto" />
              <h4 className="font-bold text-slate-800">Belum Ada Catatan Jurnal</h4>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Gunakan tab "Tulis Refleksi Baru" untuk mendokumentasikan reframing pikiranmu saat terpapar ramalan zodiak negatif.
              </p>
            </div>
          ) : (
            entries.map((entry) => (
              <div
                key={entry.id}
                className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4 hover:border-teal-200 transition"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
                      {entry.createdAt}
                    </span>
                    <div className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                      <TrendingDown className="w-3 h-3" />
                      Cemas: {entry.anxietyBefore} → {entry.anxietyAfter} (-{Math.max(0, entry.anxietyBefore - entry.anxietyAfter)})
                    </div>
                  </div>
                  <button
                    onClick={() => handleDelete(entry.id)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition"
                    title="Hapus Catatan"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-1">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-rose-600 flex items-center gap-1.5">
                    <AlertCircle className="w-3.5 h-3.5" />
                    Pemicu Ramalan / Asumsi:
                  </h4>
                  <p className="text-sm font-semibold text-slate-800 bg-rose-50/50 p-3 rounded-xl border border-rose-100">
                    "{entry.triggerThought}"
                  </p>
                </div>

                {entry.selectedDistortions.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {entry.selectedDistortions.map((d) => (
                      <span
                        key={d}
                        className="text-[11px] font-semibold bg-amber-50 text-amber-900 border border-amber-200/80 px-2.5 py-0.5 rounded-full"
                      >
                        {d}
                      </span>
                    ))}
                  </div>
                )}

                {entry.objectiveEvidence && (
                  <div className="space-y-1">
                    <h5 className="text-xs font-bold text-slate-600">Fakta Objektif:</h5>
                    <p className="text-xs text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                      {entry.objectiveEvidence}
                    </p>
                  </div>
                )}

                <div className="space-y-1">
                  <h5 className="text-xs font-bold text-teal-800 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-teal-600" />
                    Reframing Rasional & Sikap Objektif:
                  </h5>
                  <p className="text-xs text-teal-950 font-medium bg-teal-50/80 p-3 rounded-xl border border-teal-200 leading-relaxed">
                    {entry.rationalReframing}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};
