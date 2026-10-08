import React, { useState } from 'react';
import { Layers, Compass } from 'lucide-react';

interface DeckPlan {
  deckName: string;
  features: string[];
}

interface DeckPlanViewerProps {
  deckPlans: DeckPlan[];
  yachtName: string;
  lengthMeters: number;
}

export const DeckPlanViewer: React.FC<DeckPlanViewerProps> = ({
  deckPlans,
  yachtName,
  lengthMeters,
}) => {
  const [selectedDeckIndex, setSelectedDeckIndex] = useState(0);
  const activeDeck = deckPlans[selectedDeckIndex] || deckPlans[0];

  return (
    <div className="rounded-2xl border border-white/[0.08] bg-[#0E1626]/80 p-5 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-amber-400" />
          <h4 className="text-xs uppercase tracking-widest font-semibold text-slate-300">
            Naval Architecture & Decks
          </h4>
        </div>
        <span className="text-[11px] font-mono-numbers text-slate-400">
          {lengthMeters}m LOA
        </span>
      </div>

      {/* Deck Selector Tabs */}
      <div className="flex items-center gap-1.5 p-1 bg-black/40 rounded-xl border border-white/[0.04] overflow-x-auto no-scrollbar">
        {deckPlans.map((deck, idx) => (
          <button
            key={deck.deckName}
            onClick={() => setSelectedDeckIndex(idx)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all duration-200 ${
              selectedDeckIndex === idx
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
            }`}
          >
            {deck.deckName}
          </button>
        ))}
      </div>

      {/* Architectural Deck Blueprint Wireframe Graphic */}
      <div className="relative h-32 rounded-xl bg-[#070B13] border border-white/[0.06] p-3 flex flex-col items-center justify-center overflow-hidden">
        {/* Subtle grid background */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#C5A880_1px,transparent_1px)] [background-size:12px_12px]" />

        {/* Yacht Deck Blueprint SVG Illustration */}
        <svg
          viewBox="0 0 360 80"
          className="w-full h-20 text-amber-400/80 stroke-current fill-none stroke-[1.2]"
        >
          {/* Hull outline */}
          <path
            d="M 30,40 C 60,25 240,24 310,32 C 340,36 348,40 348,40 C 348,40 340,44 310,48 C 240,56 60,55 30,40 Z"
            className="stroke-amber-400/90 fill-amber-500/[0.03]"
          />
          {/* Deck partitions */}
          <line x1="80" y1="31" x2="80" y2="49" className="stroke-white/20 stroke-dasharray-2" />
          <line x1="160" y1="28" x2="160" y2="52" className="stroke-white/20" />
          <line x1="240" y1="29" x2="240" y2="51" className="stroke-white/20 stroke-dasharray-2" />

          {/* Active Deck Highlighting */}
          {selectedDeckIndex === 0 && (
            <ellipse cx="200" cy="40" rx="35" ry="9" className="stroke-amber-300 fill-amber-400/20" />
          )}
          {selectedDeckIndex === 1 && (
            <ellipse cx="150" cy="40" rx="45" ry="11" className="stroke-amber-300 fill-amber-400/20" />
          )}
          {selectedDeckIndex === 2 && (
            <path
              d="M 60,40 C 90,30 250,30 320,40 C 250,50 90,50 60,40 Z"
              className="stroke-amber-300 fill-amber-400/15"
            />
          )}
          {selectedDeckIndex === 3 && (
            <rect x="70" y="34" width="220" height="12" rx="4" className="stroke-amber-300 fill-amber-400/20" />
          )}

          {/* Bow & Stern Indicators */}
          <text x="340" y="24" fontSize="7" fill="#94A3B8" className="font-mono">BOW</text>
          <text x="18" y="24" fontSize="7" fill="#94A3B8" className="font-mono">STERN</text>
        </svg>

        <div className="absolute bottom-2 right-3 flex items-center gap-1 text-[10px] text-slate-500 font-mono">
          <Compass className="w-3 h-3 text-amber-400/60" />
          <span>Feadship Blueprint Ref. 78-A</span>
        </div>
      </div>

      {/* Deck Features List */}
      <div className="space-y-1.5 pt-1">
        <span className="text-[11px] font-medium text-amber-200/80 uppercase tracking-wider block">
          {activeDeck.deckName} Appointments:
        </span>
        <div className="grid grid-cols-2 gap-2 text-xs text-slate-300">
          {activeDeck.features.map((feat, i) => (
            <div key={i} className="flex items-center gap-1.5 py-1 px-2.5 rounded-lg bg-black/20 border border-white/[0.04]">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400/80 shrink-0" />
              <span className="truncate">{feat}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
