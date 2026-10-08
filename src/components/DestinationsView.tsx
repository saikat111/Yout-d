import React, { useState } from 'react';
import { MapPin, Compass, Calendar, ChevronRight, Anchor, Navigation } from 'lucide-react';
import { Destination, Yacht } from '../types/yacht';
import { LuxuryImage } from './LuxuryImage';

interface DestinationsViewProps {
  destinations: Destination[];
  yachts: Yacht[];
  onSelectYacht: (yachtId: string) => void;
}

export const DestinationsView: React.FC<DestinationsViewProps> = ({
  destinations,
  yachts,
  onSelectYacht,
}) => {
  const [selectedDestId, setSelectedDestId] = useState<string>(destinations[0].id);
  const activeDest = destinations.find((d) => d.id === selectedDestId) || destinations[0];

  return (
    <div className="flex-1 overflow-y-auto no-scrollbar pb-6 space-y-6 bg-[#080C14] text-slate-100">
      {/* Top Header */}
      <header className="sticky top-0 z-30 px-5 pt-3 pb-3 bg-[#080C14]/90 backdrop-blur-md border-b border-white/[0.04]">
        <h1 className="text-xl font-serif-luxury font-medium tracking-[0.2em] text-slate-100">
          EXPEDITIONS
        </h1>
        <span className="text-[10px] uppercase tracking-widest text-amber-300/70 font-mono block -mt-0.5">
          Curated Maritime Itineraries
        </span>
      </header>

      {/* Destination Selector Tabs */}
      <section className="px-4">
        <div className="flex items-center gap-1.5 p-1 bg-[#0E1626] rounded-2xl border border-white/[0.06] overflow-x-auto no-scrollbar">
          {destinations.map((dest) => (
            <button
              key={dest.id}
              onClick={() => setSelectedDestId(dest.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all duration-200 shrink-0 ${
                selectedDestId === dest.id
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
              }`}
            >
              {dest.title}
            </button>
          ))}
        </div>
      </section>

      {/* Active Destination Hero */}
      <section className="px-4">
        <div className="relative rounded-3xl overflow-hidden border border-white/[0.08] bg-[#0E1626]">
          <div className="relative h-60 w-full overflow-hidden">
            <LuxuryImage
              src={activeDest.heroImage}
              alt={activeDest.title}
              category="destination"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0E1626] via-[#0E1626]/30 to-transparent" />

            <div className="absolute bottom-4 left-4 right-4 space-y-1">
              <div className="flex items-center gap-2 text-xs text-amber-300 font-mono tracking-wider">
                <MapPin className="w-3.5 h-3.5" />
                <span>{activeDest.coordinates}</span>
                <span aria-hidden="true">·</span>
                <span>{activeDest.country}</span>
              </div>
              <h2 className="text-2xl font-serif-luxury font-semibold text-white">
                {activeDest.title}
              </h2>
            </div>
          </div>

          <div className="p-4 space-y-4">
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans-clean font-light">
              {activeDest.description}
            </p>

            <div className="flex items-center justify-between p-3 rounded-xl bg-black/30 border border-white/[0.04] text-xs">
              <div className="flex items-center gap-2 text-slate-400">
                <Calendar className="w-4 h-4 text-amber-400" />
                <span>Prime Cruising Season:</span>
              </div>
              <span className="font-semibold text-amber-300 font-mono">
                {activeDest.bestMonths}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 7-Day Day-by-Day Anchorages Timeline */}
      <section className="px-4 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs uppercase tracking-widest font-semibold text-slate-300 font-mono">
            {activeDest.itinerarySummary.durationDays}-Day Route Anchorages
          </h3>
          <span className="text-[11px] text-slate-500 font-mono">Nautical Waypoints</span>
        </div>

        <div className="p-4 rounded-2xl bg-[#0E1626] border border-white/[0.06] space-y-3">
          {activeDest.itinerarySummary.anchorages.map((anc, idx) => (
            <div key={idx} className="relative flex items-start gap-3 text-xs">
              {/* Timeline dot and connecting line */}
              <div className="flex flex-col items-center">
                <div className="w-5 h-5 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-[10px] font-mono font-bold text-amber-300 shrink-0">
                  {idx + 1}
                </div>
                {idx < activeDest.itinerarySummary.anchorages.length - 1 && (
                  <div className="w-0.5 h-6 bg-slate-700/60 my-0.5" />
                )}
              </div>

              <div className="pt-0.5">
                <span className="text-slate-200 font-medium block">{anc}</span>
                <span className="text-[11px] text-slate-500">
                  {idx === 0
                    ? 'Embarkation & welcome champagne reception'
                    : idx === activeDest.itinerarySummary.anchorages.length - 1
                    ? 'Final breakfast & private aviation transfer'
                    : 'Protected anchorage, tender excursions & water toys'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Curated Highlights */}
      <section className="px-4 space-y-3">
        <h3 className="text-xs uppercase tracking-widest font-semibold text-slate-300 font-mono">
          Expedition Exclusives
        </h3>
        <div className="space-y-2">
          {activeDest.highlights.map((hl, idx) => (
            <div
              key={idx}
              className="flex items-start gap-2.5 p-3 rounded-xl bg-[#0E1626] border border-white/[0.04] text-xs text-slate-300"
            >
              <Navigation className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
              <span className="leading-relaxed">{hl}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Recommended Fleet for this Destination */}
      <section className="px-4 space-y-3">
        <h3 className="text-xs uppercase tracking-widest font-semibold text-slate-300 font-mono">
          Recommended Fleet for {activeDest.title}
        </h3>

        <div className="space-y-2.5">
          {yachts
            .filter((y) => activeDest.recommendedYachtIds.includes(y.id))
            .map((yacht) => (
              <div
                key={yacht.id}
                onClick={() => onSelectYacht(yacht.id)}
                className="p-3 rounded-2xl bg-[#0E1626] border border-white/[0.06] hover:border-amber-500/30 transition-all flex items-center justify-between cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0 border border-white/10">
                    <LuxuryImage
                      src={yacht.coverImage}
                      alt={yacht.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="text-xs">
                    <span className="font-semibold text-slate-200 block text-sm font-serif-luxury">
                      {yacht.name}
                    </span>
                    <span className="text-slate-400 text-[11px]">
                      {yacht.lengthMeters}m · {yacht.guests} Guests · {yacht.builder}
                    </span>
                    <span className="text-amber-300/80 font-mono-numbers block mt-0.5">
                      €{(yacht.weeklyRateEuros / 1000).toLocaleString()}k / wk
                    </span>
                  </div>
                </div>

                <div className="w-8 h-8 rounded-full bg-white/[0.04] flex items-center justify-center text-slate-300">
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            ))}
        </div>
      </section>
    </div>
  );
};
