import React, { useState } from 'react';
import { Search, SlidersHorizontal, Bookmark, ChevronRight, Waves, Compass, Wind } from 'lucide-react';
import { Yacht, Destination } from '../types/yacht';
import { LuxuryImage } from './LuxuryImage';

interface DiscoveryViewProps {
  yachts: Yacht[];
  destinations: Destination[];
  onSelectYacht: (yachtId: string) => void;
  onSelectDestination: (destId: string) => void;
  savedYachtIds: string[];
  onToggleSave: (yachtId: string) => void;
}

export const DiscoveryView: React.FC<DiscoveryViewProps> = ({
  yachts,
  destinations,
  onSelectYacht,
  onSelectDestination,
  savedYachtIds,
  onToggleSave,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'megayacht' | 'superyacht' | 'catamaran' | 'explorer'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredYachts = yachts.filter((yacht) => {
    const matchesCategory = selectedCategory === 'all' || yacht.category === selectedCategory;
    const matchesQuery =
      searchQuery === '' ||
      yacht.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      yacht.builder.toLowerCase().includes(searchQuery.toLowerCase()) ||
      yacht.currentLocation.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  const heroYacht = yachts[0]; // Aurelia 78m

  return (
    <div className="flex-1 overflow-y-auto no-scrollbar pb-6 space-y-6 bg-[#080C14] text-slate-100">
      {/* Brand Top Bar Contract: Zone 1 (Wordmark) - Zone 2 (Search trigger) - Zone 3 (Profile/Filter) */}
      <header className="sticky top-0 z-30 px-5 pt-3 pb-3 bg-[#080C14]/90 backdrop-blur-md border-b border-white/[0.04] flex items-center justify-between">
        <div>
          <h1 className="text-xl font-serif-luxury font-medium tracking-[0.2em] text-slate-100">
            PELAGOS
          </h1>
          <span className="text-[10px] uppercase tracking-widest text-amber-300/70 font-mono block -mt-0.5">
            Haute Plaisance Atelier
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              const el = document.getElementById('search-input');
              el?.focus();
            }}
            className="w-9 h-9 rounded-full bg-white/[0.06] hover:bg-white/[0.1] text-slate-300 flex items-center justify-center transition-colors"
            title="Search Fleet"
          >
            <Search className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Hero Featured Vessel Card (Visual Focal Anchor per Section 1.C) */}
      <section className="px-4">
        <div
          onClick={() => onSelectYacht(heroYacht.id)}
          className="group relative rounded-3xl overflow-hidden border border-white/[0.08] bg-[#0E1626] shadow-xl cursor-pointer transition-transform duration-300 active:scale-[0.99]"
        >
          {/* Main Hero Visual */}
          <div className="relative h-72 sm:h-80 w-full overflow-hidden">
            <LuxuryImage
              src={heroYacht.coverImage}
              alt={heroYacht.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            {/* Measured Scrim for Media Overlays (Section 1.F) */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#080C14] via-[#080C14]/40 to-transparent" />

            {/* Quick Action Overlay: Save Bookmark */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleSave(heroYacht.id);
              }}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white flex items-center justify-center transition-colors hover:bg-black/60 active:scale-90"
              title="Save Yacht"
            >
              <Bookmark
                className={`w-4 h-4 ${
                  savedYachtIds.includes(heroYacht.id)
                    ? 'fill-amber-400 text-amber-400'
                    : 'text-white'
                }`}
              />
            </button>

            {/* Vessel Metadata & Title Lockup */}
            <div className="absolute bottom-4 left-4 right-4 space-y-2">
              <div className="flex items-center gap-2 text-xs text-amber-300/90 font-mono tracking-wider">
                <span>FLAGSHIP COMMISSION</span>
                <span aria-hidden="true">·</span>
                <span>FEADSHIP {heroYacht.yearBuilt}</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-serif-luxury font-semibold text-white tracking-wide leading-tight">
                {heroYacht.name}
              </h2>

              {/* Zero-Pill Metadata (Section 1.A) */}
              <div className="flex items-center gap-2 text-xs text-slate-300 font-sans-clean">
                <span>{heroYacht.lengthMeters}m LOA</span>
                <span aria-hidden="true">·</span>
                <span>{heroYacht.guests} Guests</span>
                <span aria-hidden="true">·</span>
                <span>{heroYacht.crew} Crew</span>
              </div>

              <div className="pt-2 flex items-center justify-between border-t border-white/15 text-xs">
                <span className="text-slate-300">
                  From <strong className="font-mono-numbers text-amber-300 text-sm font-semibold">€{(heroYacht.weeklyRateEuros / 1000).toLocaleString()}k</strong> / week
                </span>
                <span className="text-xs text-amber-300 font-medium flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Explore Vessel <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Category Segmented Filter Buttons (Section 1.A DO rule) */}
      <section className="px-4">
        <div className="flex items-center gap-1.5 p-1 bg-[#0E1626] rounded-2xl border border-white/[0.06] overflow-x-auto no-scrollbar">
          {[
            { id: 'all', label: 'All Fleet' },
            { id: 'megayacht', label: 'Megayachts (70m+)' },
            { id: 'superyacht', label: 'Superyachts' },
            { id: 'catamaran', label: 'Eco-Catamarans' },
            { id: 'explorer', label: 'Polar Explorers' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id as any)}
              className={`px-3.5 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all duration-200 shrink-0 ${
                selectedCategory === cat.id
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </section>

      {/* Discover Yacht Fleet Grid / Stack */}
      <section className="px-4 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm uppercase tracking-widest font-semibold text-slate-300 font-mono">
            Curated Fleet ({filteredYachts.length})
          </h3>
          <span className="text-xs text-slate-500">Mediterranean & Global</span>
        </div>

        <div className="space-y-4">
          {filteredYachts.map((yacht) => (
            <div
              key={yacht.id}
              onClick={() => onSelectYacht(yacht.id)}
              className="group relative rounded-2xl overflow-hidden border border-white/[0.06] bg-[#0E1626] hover:border-amber-500/30 transition-all duration-200 cursor-pointer active:scale-[0.99]"
            >
              <div className="relative h-48 w-full overflow-hidden">
                <LuxuryImage
                  src={yacht.coverImage}
                  alt={yacht.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0E1626] via-[#0E1626]/30 to-transparent" />

                {/* Bookmark Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleSave(yacht.id);
                  }}
                  className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white flex items-center justify-center transition-colors hover:bg-black/60"
                  title="Bookmark"
                >
                  <Bookmark
                    className={`w-3.5 h-3.5 ${
                      savedYachtIds.includes(yacht.id)
                        ? 'fill-amber-400 text-amber-400'
                        : 'text-white'
                    }`}
                  />
                </button>

                <div className="absolute bottom-3 left-4 right-4">
                  <span className="text-[10px] font-mono tracking-widest text-amber-300/80 uppercase block">
                    {yacht.builder}
                  </span>
                  <h4 className="text-xl font-serif-luxury font-semibold text-white">
                    {yacht.name}
                  </h4>
                </div>
              </div>

              {/* Card Body & Specs */}
              <div className="p-4 space-y-2">
                <p className="text-xs text-slate-400 line-clamp-1">
                  {yacht.tagline}
                </p>

                {/* Zero-Pill Metadata */}
                <div className="flex items-center gap-2 text-xs text-slate-400 pt-1">
                  <span>{yacht.lengthMeters}m</span>
                  <span aria-hidden="true">·</span>
                  <span>{yacht.guests} Guests</span>
                  <span aria-hidden="true">·</span>
                  <span>{yacht.cabins} Cabins</span>
                  <span aria-hidden="true">·</span>
                  <span>{yacht.cruisingSpeedKnots} kn Cruising</span>
                </div>

                <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between text-xs">
                  <span className="text-slate-300">
                    <strong className="font-mono-numbers text-amber-300 text-sm font-semibold">
                      €{(yacht.weeklyRateEuros / 1000).toLocaleString()}k
                    </strong>{' '}
                    / wk + APA
                  </span>
                  <span className="text-[11px] font-medium text-slate-300 group-hover:text-amber-300 transition-colors flex items-center gap-1">
                    View Vessel Details <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Destination Expeditions Rail */}
      <section className="px-4 space-y-3 pt-2">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm uppercase tracking-widest font-semibold text-slate-300 font-mono">
              Cruising Grounds & Itineraries
            </h3>
            <p className="text-xs text-slate-500">Curated private anchorages</p>
          </div>
        </div>

        <div className="flex items-center gap-3 overflow-x-auto no-scrollbar pb-2">
          {destinations.map((dest) => (
            <div
              key={dest.id}
              onClick={() => onSelectDestination(dest.id)}
              className="group min-w-[240px] max-w-[240px] rounded-2xl overflow-hidden border border-white/[0.06] bg-[#0E1626] cursor-pointer hover:border-amber-500/30 transition-all shrink-0 active:scale-[0.98]"
            >
              <div className="relative h-32 w-full overflow-hidden">
                <LuxuryImage
                  src={dest.heroImage}
                  alt={dest.title}
                  category="destination"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0E1626] via-[#0E1626]/20 to-transparent" />
                <div className="absolute bottom-2 left-3 right-3">
                  <span className="text-[10px] font-mono text-amber-300/80 block">
                    {dest.region}
                  </span>
                  <h5 className="text-sm font-serif-luxury font-semibold text-white truncate">
                    {dest.title}
                  </h5>
                </div>
              </div>

              <div className="p-3 text-xs space-y-1">
                <span className="text-slate-400 block text-[11px]">
                  {dest.itinerarySummary.durationDays}-Day Bespoke Route
                </span>
                <span className="text-amber-300/80 text-[11px] font-medium flex items-center gap-1">
                  Explore Route <ChevronRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Accredited Charter Atelier Proof (Section 1.H) */}
      <section className="mx-4 p-4 rounded-2xl bg-[#090E1A] border border-white/[0.06] flex items-center justify-between text-xs text-slate-400">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-300 shrink-0">
            <Compass className="w-5 h-5" />
          </div>
          <div>
            <span className="font-semibold text-slate-200 block">MYBA Accredited Superyacht Charter</span>
            <span className="text-[11px] text-slate-500">Monaco · Antibes · Geneva · London</span>
          </div>
        </div>
      </section>
    </div>
  );
};
