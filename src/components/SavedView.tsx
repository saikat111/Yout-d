import React from 'react';
import { Bookmark, ChevronRight, Trash2, Ship, ArrowRight } from 'lucide-react';
import { Yacht } from '../types/yacht';
import { LuxuryImage } from './LuxuryImage';

interface SavedViewProps {
  savedYachts: Yacht[];
  onSelectYacht: (yachtId: string) => void;
  onRemoveSaved: (yachtId: string) => void;
  onExploreFleet: () => void;
}

export const SavedView: React.FC<SavedViewProps> = ({
  savedYachts,
  onSelectYacht,
  onRemoveSaved,
  onExploreFleet,
}) => {
  return (
    <div className="flex-1 overflow-y-auto no-scrollbar pb-6 space-y-6 bg-[#080C14] text-slate-100">
      <header className="sticky top-0 z-30 px-5 pt-3 pb-3 bg-[#080C14]/90 backdrop-blur-md border-b border-white/[0.04]">
        <h1 className="text-xl font-serif-luxury font-medium tracking-[0.2em] text-slate-100">
          SAVED FLEET
        </h1>
        <span className="text-[10px] uppercase tracking-widest text-amber-300/70 font-mono block -mt-0.5">
          Curated Shortlist ({savedYachts.length})
        </span>
      </header>

      {savedYachts.length === 0 ? (
        <div className="py-16 px-6 text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-slate-800/60 border border-white/10 flex items-center justify-center text-slate-400 mx-auto">
            <Bookmark className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-serif-luxury font-semibold text-slate-200">
              Your Shortlist is Empty
            </h3>
            <p className="text-xs text-slate-400 max-w-xs mx-auto mt-1">
              Tap the bookmark emblem on any vessel in the discovery feed to save and compare charter options.
            </p>
          </div>
          <button
            onClick={onExploreFleet}
            className="px-5 py-2.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-semibold hover:bg-amber-500/25 transition-colors"
          >
            Explore Master Fleet
          </button>
        </div>
      ) : (
        <div className="px-4 space-y-4">
          <div className="space-y-3">
            {savedYachts.map((yacht) => (
              <div
                key={yacht.id}
                onClick={() => onSelectYacht(yacht.id)}
                className="group relative rounded-2xl overflow-hidden border border-white/[0.06] bg-[#0E1626] hover:border-amber-500/30 transition-all cursor-pointer active:scale-[0.99]"
              >
                <div className="flex p-3 gap-3">
                  <div className="w-24 h-24 rounded-xl overflow-hidden shrink-0 border border-white/10 relative">
                    <LuxuryImage
                      src={yacht.coverImage}
                      alt={yacht.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between py-0.5">
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono text-amber-400 uppercase tracking-wider">
                          {yacht.builder}
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onRemoveSaved(yacht.id);
                          }}
                          className="text-slate-500 hover:text-red-400 p-1 transition-colors"
                          title="Remove from saved"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <h4 className="text-base font-serif-luxury font-semibold text-white">
                        {yacht.name}
                      </h4>

                      <p className="text-[11px] text-slate-400">
                        {yacht.lengthMeters}m · {yacht.guests} Guests · {yacht.crew} Crew
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <span className="text-xs font-mono-numbers text-amber-300 font-semibold">
                        €{(yacht.weeklyRateEuros / 1000).toLocaleString()}k / wk
                      </span>
                      <span className="text-[11px] text-slate-400 group-hover:text-amber-300 transition-colors flex items-center gap-0.5">
                        Details <ChevronRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Fleet Comparison Matrix */}
          <div className="p-4 rounded-2xl bg-[#0A101C] border border-white/[0.06] space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-widest text-slate-300">
              Vessel Comparison Matrix
            </h4>
            <div className="overflow-x-auto no-scrollbar">
              <table className="w-full text-left text-xs font-mono-numbers text-slate-300">
                <thead>
                  <tr className="border-b border-white/10 text-[10px] text-slate-500 uppercase">
                    <th className="pb-2 font-sans-clean font-medium">Vessel</th>
                    <th className="pb-2 text-right">Length</th>
                    <th className="pb-2 text-right">Guests</th>
                    <th className="pb-2 text-right">Speed</th>
                    <th className="pb-2 text-right">Rate/Wk</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.04]">
                  {savedYachts.map((y) => (
                    <tr key={y.id} className="hover:bg-white/[0.02]">
                      <td className="py-2 font-medium text-slate-200 font-sans-clean">{y.name}</td>
                      <td className="py-2 text-right text-slate-400">{y.lengthMeters}m</td>
                      <td className="py-2 text-right text-slate-400">{y.guests}</td>
                      <td className="py-2 text-right text-slate-400">{y.cruisingSpeedKnots} kn</td>
                      <td className="py-2 text-right text-amber-300 font-semibold">
                        €{(y.weeklyRateEuros / 1000).toLocaleString()}k
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
