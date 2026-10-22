import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, CloudRain, Waves, Trees, Sparkles } from 'lucide-react';
import { ambientSound } from '../utils/ambientAudio';

export const AmbientPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<'rain' | 'ocean' | 'forest' | 'binaural'>('rain');
  const [volume, setVolume] = useState(0.35);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    return () => {
      ambientSound.stop();
    };
  }, []);

  const togglePlay = () => {
    if (isPlaying) {
      ambientSound.stop();
      setIsPlaying(false);
    } else {
      ambientSound.play(currentTrack, volume);
      setIsPlaying(true);
    }
  };

  const handleTrackChange = (track: 'rain' | 'ocean' | 'forest' | 'binaural') => {
    setCurrentTrack(track);
    if (isPlaying) {
      ambientSound.play(track, volume);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    ambientSound.setVolume(val);
  };

  const trackLabels = {
    rain: { label: 'Hujan Rintik', icon: CloudRain, color: 'text-sky-500' },
    ocean: { label: 'Ombak Tenang', icon: Waves, color: 'text-teal-500' },
    forest: { label: 'Angin Hutan', icon: Trees, color: 'text-emerald-500' },
    binaural: { label: 'Gelombang Alpha 10Hz', icon: Sparkles, color: 'text-indigo-500' },
  };

  return (
    <div className="relative">
      <div className="flex items-center gap-1.5 bg-slate-100/90 hover:bg-slate-200/80 p-1.5 rounded-full border border-slate-200/90 transition shadow-xs">
        <button
          onClick={togglePlay}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold transition ${
            isPlaying
              ? 'bg-teal-600 text-white shadow-xs animate-pulse-slow'
              : 'text-slate-600 hover:text-slate-900'
          }`}
          title={isPlaying ? 'Jeda Suara Latar' : 'Putar Suara Latar Relaksasi'}
          aria-label={isPlaying ? 'Jeda Suara Latar' : 'Putar Suara Latar Relaksasi'}
        >
          {isPlaying ? <Volume2 className="h-3.5 w-3.5" /> : <VolumeX className="h-3.5 w-3.5" />}
          <span className="hidden sm:inline">
            {isPlaying ? trackLabels[currentTrack].label : 'Suara Tenang'}
          </span>
        </button>

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="px-2 py-1 text-slate-500 hover:text-slate-800 text-[11px] font-medium rounded-full"
          title="Pengaturan Suara Ambien"
        >
          ⚙️
        </button>
      </div>

      {isExpanded && (
        <div className="absolute right-0 top-full mt-2 w-72 rounded-2xl bg-white p-4 shadow-xl border border-slate-200 z-50 animate-fadeIn">
          <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-100">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Suara Relaksasi & Grounding
            </h4>
            <span className="text-[10px] text-teal-700 font-semibold bg-teal-50 px-2 py-0.5 rounded-full">
              Sintesis Web Audio
            </span>
          </div>

          {/* Track selector */}
          <div className="grid grid-cols-2 gap-2 mb-4">
            {(['rain', 'ocean', 'forest', 'binaural'] as const).map((t) => {
              const info = trackLabels[t];
              const Icon = info.icon;
              const isActive = currentTrack === t;
              return (
                <button
                  key={t}
                  onClick={() => handleTrackChange(t)}
                  className={`flex items-center gap-2 p-2 rounded-xl text-xs font-medium border text-left transition ${
                    isActive
                      ? 'border-teal-500 bg-teal-50/70 text-teal-900 font-semibold shadow-xs'
                      : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-slate-50/50'
                  }`}
                >
                  <Icon className={`h-4 w-4 shrink-0 ${info.color}`} />
                  <span className="truncate">{info.label}</span>
                </button>
              );
            })}
          </div>

          {/* Volume slider */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-[11px] text-slate-500">
              <span>Volume</span>
              <span>{Math.round(volume * 100)}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={volume}
              onChange={handleVolumeChange}
              className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-teal-600"
            />
          </div>

          <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between">
            <p className="text-[10px] text-slate-500">
              Bermanfaat untuk menurunkan hormon kortisol.
            </p>
            <button
              onClick={togglePlay}
              className={`text-xs px-2.5 py-1 rounded-lg font-semibold transition ${
                isPlaying
                  ? 'bg-rose-100 text-rose-700 hover:bg-rose-200'
                  : 'bg-teal-600 text-white hover:bg-teal-700'
              }`}
            >
              {isPlaying ? 'Matikan' : 'Putar'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
