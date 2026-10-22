import React, { useState } from 'react';
import { BookOpen, Search, Sparkles, ExternalLink, Quote, X, CheckCircle2 } from 'lucide-react';
import { DEBUNK_ARTICLES } from '../data/debunkData';
import { DebunkArticle } from '../types';

export const DebunkLibrary: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [selectedArticle, setSelectedArticle] = useState<DebunkArticle | null>(null);

  const categories = ['Semua', 'Psikologi Kognitif', 'Astronomi', 'Riset Ilmiah', 'Kesehatan Mental'];

  const filteredArticles = DEBUNK_ARTICLES.filter((art) => {
    const matchesCategory = selectedCategory === 'Semua' || art.category === selectedCategory;
    const matchesSearch =
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.scientificConcept.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.takeaway.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 via-teal-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 text-teal-200 text-xs font-semibold">
            <BookOpen className="w-3.5 h-3.5" />
            Literasi Ilmiah & Psikoedukasi
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Kamus Sains Anti-Cocoklogi
          </h2>
          <p className="text-sm text-teal-100/90 max-w-2xl">
            Pelajari bukti riset empiris, eksperimen psikologi kognitif, dan hukum astronomi nyata yang membongkar mitos ramalan bintang dan cocoklogi nasib.
          </p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari konsep (misal: Barnum, Presesi)..."
            className="w-full rounded-2xl border border-slate-200 pl-10 pr-4 py-2 text-xs bg-white focus:border-teal-500 focus:ring-2 focus:ring-teal-100 outline-none transition"
          />
        </div>

        <div className="flex flex-wrap gap-1.5 w-full sm:w-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition ${
                selectedCategory === cat
                  ? 'bg-teal-700 text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredArticles.map((art) => (
          <div
            key={art.id}
            onClick={() => setSelectedArticle(art)}
            className="group bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:border-teal-400 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-teal-700 bg-teal-50 px-2.5 py-0.5 rounded-full border border-teal-100">
                  {art.category}
                </span>
                <span className="text-slate-600 text-[11px] font-medium">{art.readTime}</span>
              </div>

              <h3 className="font-bold text-slate-900 text-base group-hover:text-teal-700 transition leading-snug">
                {art.title}
              </h3>

              <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                {art.subtitle}
              </p>
            </div>

            <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-teal-600 group-hover:translate-x-1 transition-transform">
              <span>Baca Bukti Ilmiah</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </div>
          </div>
        ))}
      </div>

      {/* Article Detail Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden max-h-[85vh] flex flex-col">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-teal-900 to-slate-900 p-6 text-white shrink-0">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-bold text-teal-200 bg-teal-800/60 px-2.5 py-0.5 rounded-full">
                      {selectedArticle.category}
                    </span>
                    <span className="text-xs text-slate-300 font-medium">{selectedArticle.readTime}</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold leading-snug">
                    {selectedArticle.title}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="p-1.5 rounded-xl text-white/80 hover:bg-white/10 hover:text-white transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-5 text-sm">
              {/* Key Concept Box */}
              <div className="p-4 rounded-2xl bg-teal-50 border border-teal-200/80 text-teal-950 space-y-1">
                <h4 className="text-xs font-bold uppercase tracking-wider text-teal-800 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-teal-600" />
                  Konsep Sains Inti:
                </h4>
                <p className="text-xs leading-relaxed font-medium">
                  {selectedArticle.scientificConcept}
                </p>
              </div>

              {/* Experiment highlight */}
              <div className="p-4 rounded-2xl bg-indigo-50/60 border border-indigo-100 text-indigo-950 space-y-1">
                <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-800">
                  🔬 Eksperimen & Bukti Empiris:
                </h4>
                <p className="text-xs leading-relaxed text-indigo-900">
                  {selectedArticle.experiment}
                </p>
              </div>

              {/* Paragraphs */}
              <div className="space-y-3 text-slate-700 leading-relaxed text-xs sm:text-sm">
                {selectedArticle.content.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>

              {/* Quote */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3 italic text-xs text-slate-700">
                <Quote className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
                <p>{selectedArticle.keyQuote}</p>
              </div>

              {/* Takeaway */}
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-950 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-emerald-900">Kesimpulan Rasional:</h4>
                  <p className="text-xs leading-relaxed text-emerald-800 mt-0.5">
                    {selectedArticle.takeaway}
                  </p>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end shrink-0">
              <button
                onClick={() => setSelectedArticle(null)}
                className="px-5 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition"
              >
                Tutup Artikel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
