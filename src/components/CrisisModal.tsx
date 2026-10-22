import React from 'react';
import { PhoneCall, AlertTriangle, ShieldCheck, HeartHandshake, X } from 'lucide-react';

interface CrisisModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CrisisModal: React.FC<CrisisModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div 
        className="relative w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl border border-slate-100"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-teal-700 to-emerald-700 px-6 py-5 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="rounded-xl bg-white/15 p-2 backdrop-blur-md">
                <HeartHandshake className="h-6 w-6 text-teal-100" />
              </div>
              <div>
                <h3 className="text-lg font-bold">Pusat Bantuan & Krisis Psikologis</h3>
                <p className="text-xs text-teal-100">Kamu tidak sendirian. Bantuan profesional selalu tersedia.</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="rounded-lg p-1.5 text-white/80 transition-colors hover:bg-white/20 hover:text-white"
              aria-label="Tutup modal"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          <div className="flex items-start gap-3 rounded-xl bg-amber-50 p-3.5 border border-amber-200/80 text-amber-900 text-xs leading-relaxed">
            <AlertTriangle className="h-5 w-5 shrink-0 text-amber-600 mt-0.5" />
            <p>
              <strong>Batas Layanan Virtual:</strong> Rational Mind Bot adalah alat psikoedukasi dan terapi pendamping kognitif (CBT), bukan pengganti penanganan psikiater atau psikolog klinis berlisensi tatap muka dalam kondisi darurat medis/psikologis.
            </p>
          </div>

          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Layanan Darurat & Konseling Gratis Indonesia
          </h4>

          <div className="space-y-3">
            {/* Sejiwa */}
            <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4 transition-all hover:bg-teal-50/40 hover:border-teal-300">
              <div className="flex items-start justify-between">
                <div>
                  <h5 className="font-semibold text-slate-900 text-sm flex items-center gap-1.5">
                    Layanan SEJIWA (Kemenkes RI)
                    <span className="inline-block rounded bg-teal-100 text-teal-800 text-[10px] font-bold px-1.5 py-0.5">Gratis</span>
                  </h5>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Layanan kesehatan mental resmi Kemenkes bekerjasama dengan HIMPSI.
                  </p>
                </div>
                <a
                  href="tel:119"
                  className="inline-flex items-center gap-1.5 rounded-lg bg-teal-600 px-3 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-teal-700 transition"
                >
                  <PhoneCall className="h-3.5 w-3.5" />
                  Hubungi 119
                </a>
              </div>
              <p className="text-[11px] text-slate-500 mt-2 font-mono">
                Tekan 119 kemudian pilih ekstensi 8 (SEJIWA)
              </p>
            </div>

            {/* Yayasan Pulih */}
            <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4 transition-all hover:bg-teal-50/40 hover:border-teal-300">
              <div className="flex items-start justify-between">
                <div>
                  <h5 className="font-semibold text-slate-900 text-sm">
                    Yayasan Pulih (Trauma & Konseling)
                  </h5>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Pendampingan psikologis untuk krisis, trauma, dan kecemasan berat.
                  </p>
                </div>
                <a
                  href="https://wa.me/628118436633"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg bg-slate-800 px-3 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-slate-900 transition"
                >
                  WhatsApp
                </a>
              </div>
              <p className="text-[11px] text-slate-500 mt-2 font-mono">
                WA: +62 811-8436-633 (Senin - Jumat)
              </p>
            </div>

            {/* LISA Suicide Prevention */}
            <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4 transition-all hover:bg-teal-50/40 hover:border-teal-300">
              <div className="flex items-start justify-between">
                <div>
                  <h5 className="font-semibold text-slate-900 text-sm">
                    LISA (Love Inside Suicide Awareness)
                  </h5>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Helpline 24 jam pencegahan bunuh diri dan krisis emosional mendalam.
                  </p>
                </div>
                <a
                  href="tel:08113855472"
                  className="inline-flex items-center gap-1.5 rounded-lg bg-rose-600 px-3 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-rose-700 transition"
                >
                  <PhoneCall className="h-3.5 w-3.5" />
                  0811-3855-472
                </a>
              </div>
            </div>
          </div>

          <div className="rounded-xl bg-teal-50 p-3.5 border border-teal-200 text-xs text-teal-900 flex items-center gap-2.5">
            <ShieldCheck className="h-5 w-5 text-teal-700 shrink-0" />
            <span>
              Privasi Anda aman. Menjangkau bantuan adalah tanda kekuatan mental, bukan kelemahan.
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-50 px-6 py-4 flex justify-end border-t border-slate-100">
          <button
            onClick={onClose}
            className="rounded-xl bg-slate-200 px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-300 transition"
          >
            Kembali ke Aplikasi
          </button>
        </div>
      </div>
    </div>
  );
};
