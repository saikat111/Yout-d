import React, { useState } from 'react';
import {
  ArrowLeft,
  Bookmark,
  Share2,
  Anchor,
  Compass,
  Users,
  Bed,
  Shield,
  Gauge,
  Sparkles,
  ChevronRight,
  Waves,
  PhoneCall,
  MapPin,
  Check,
  Plane,
  Film,
  Utensils,
  Zap,
  BatteryCharging,
  Activity,
  Sun,
  Wind,
  Eye,
} from 'lucide-react';
import { Yacht } from '../types/yacht';
import { LuxuryImage } from './LuxuryImage';
import { DeckPlanViewer } from './DeckPlanViewer';

interface YachtDetailViewProps {
  yacht: Yacht;
  onBack: () => void;
  onStartBooking: () => void;
  isSaved: boolean;
  onToggleSave: () => void;
  onViewDestination: (destId: string) => void;
}

export const YachtDetailView: React.FC<YachtDetailViewProps> = ({
  yacht,
  onBack,
  onStartBooking,
  isSaved,
  onToggleSave,
  onViewDestination,
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [shareCopied, setShareCopied] = useState(false);

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setShareCopied(true);
    setTimeout(() => setShareCopied(false), 2000);
  };

  const getAmenityIcon = (iconName: string) => {
    switch (iconName) {
      case 'Waves': return <Waves className="w-4 h-4 text-amber-400" />;
      case 'Plane': return <Plane className="w-4 h-4 text-amber-400" />;
      case 'Sparkles': return <Sparkles className="w-4 h-4 text-amber-400" />;
      case 'Film': return <Film className="w-4 h-4 text-amber-400" />;
      case 'BatteryCharging': return <BatteryCharging className="w-4 h-4 text-amber-400" />;
      case 'Utensils': return <Utensils className="w-4 h-4 text-amber-400" />;
      case 'Activity': return <Activity className="w-4 h-4 text-amber-400" />;
      case 'Sun': return <Sun className="w-4 h-4 text-amber-400" />;
      case 'Zap': return <Zap className="w-4 h-4 text-amber-400" />;
      case 'Wind': return <Wind className="w-4 h-4 text-amber-400" />;
      case 'Eye': return <Eye className="w-4 h-4 text-amber-400" />;
      default: return <Anchor className="w-4 h-4 text-amber-400" />;
    }
  };

  return (
    <div className="relative flex-1 flex flex-col h-full bg-[#080C14] text-slate-100 overflow-hidden">
      {/* Android Top App Bar */}
      <header className="sticky top-0 z-30 px-4 h-14 bg-[#080C14]/90 backdrop-blur-md border-b border-white/[0.04] flex items-center justify-between shrink-0">
        <button
          onClick={onBack}
          className="w-10 h-10 rounded-full bg-white/[0.06] hover:bg-white/[0.12] flex items-center justify-center text-slate-200 transition-colors"
          title="Back to fleet"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>

        <div className="text-center">
          <span className="text-[10px] font-mono tracking-widest text-amber-400/90 uppercase block">
            {yacht.category.toUpperCase()}
          </span>
          <h2 className="text-base font-serif-luxury font-semibold text-slate-100 truncate max-w-[180px]">
            {yacht.name}
          </h2>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={handleShare}
            className="w-9 h-9 rounded-full bg-white/[0.06] hover:bg-white/[0.12] flex items-center justify-center text-slate-300 transition-colors"
            title="Share vessel"
          >
            {shareCopied ? (
              <Check className="w-4 h-4 text-emerald-400" />
            ) : (
              <Share2 className="w-4 h-4" />
            )}
          </button>
          <button
            onClick={onToggleSave}
            className="w-9 h-9 rounded-full bg-white/[0.06] hover:bg-white/[0.12] flex items-center justify-center transition-colors"
            title="Save vessel"
          >
            <Bookmark
              className={`w-4 h-4 ${
                isSaved ? 'fill-amber-400 text-amber-400' : 'text-slate-300'
              }`}
            />
          </button>
        </div>
      </header>

      {/* Scrollable Vessel Content Body */}
      <div className="flex-1 overflow-y-auto no-scrollbar pb-28 space-y-6">
        {/* Full-bleed Gallery Carousel */}
        <section className="relative">
          <div className="relative h-72 sm:h-80 w-full overflow-hidden bg-slate-900">
            <LuxuryImage
              src={yacht.galleryImages[activeImageIndex]?.url || yacht.coverImage}
              alt={`${yacht.name} view`}
              className="w-full h-full object-cover transition-all duration-500"
            />
            {/* Scrim */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#080C14] via-transparent to-black/30 pointer-events-none" />

            {/* Active image caption */}
            <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between pointer-events-none">
              <span className="text-[11px] font-medium text-slate-200 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                {yacht.galleryImages[activeImageIndex]?.caption || yacht.tagline}
              </span>

              {/* Gallery Indicator Pills */}
              <div className="flex items-center gap-1 bg-black/40 backdrop-blur-md px-2 py-1 rounded-full border border-white/10">
                {yacht.galleryImages.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`h-1.5 rounded-full transition-all duration-300 pointer-events-auto ${
                      activeImageIndex === idx
                        ? 'w-5 bg-amber-400'
                        : 'w-1.5 bg-white/40 hover:bg-white/70'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Quick Gallery Thumbnail Strip */}
          <div className="flex items-center gap-2 px-4 pt-2 overflow-x-auto no-scrollbar">
            {yacht.galleryImages.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImageIndex(idx)}
                className={`relative w-16 h-12 rounded-lg overflow-hidden shrink-0 border transition-all ${
                  activeImageIndex === idx
                    ? 'border-amber-400 ring-2 ring-amber-400/20'
                    : 'border-white/10 opacity-60 hover:opacity-100'
                }`}
              >
                <img
                  src={img.url}
                  alt={img.caption}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </section>

        {/* Vessel Header & Provenance */}
        <section className="px-4 space-y-2">
          <div className="flex items-center gap-2 text-xs text-amber-300/80 font-mono tracking-widest">
            <span>{yacht.builder}</span>
            <span aria-hidden="true">·</span>
            <span>BUILT {yacht.yearBuilt}</span>
            {yacht.refitYear && (
              <>
                <span aria-hidden="true">·</span>
                <span>REFIT {yacht.refitYear}</span>
              </>
            )}
          </div>

          <h1 className="text-3xl font-serif-luxury font-semibold text-white tracking-wide">
            {yacht.name}
          </h1>

          <p className="text-sm font-serif-luxury italic text-slate-300 leading-relaxed">
            "{yacht.tagline}"
          </p>

          <div className="flex items-center gap-1.5 text-xs text-slate-400 pt-1">
            <MapPin className="w-3.5 h-3.5 text-amber-400" />
            <span>Currently berthed: <strong className="text-slate-200">{yacht.currentLocation}</strong></span>
          </div>
        </section>

        {/* Primary Naval Specifications Grid (Single-Elevation Depth, Section 1.C) */}
        <section className="px-4">
          <div className="grid grid-cols-4 gap-2 p-3.5 rounded-2xl bg-[#0E1626] border border-white/[0.06] text-center font-mono-numbers">
            <div className="space-y-0.5">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-sans-clean">Length</span>
              <span className="text-sm font-bold text-amber-200">{yacht.lengthMeters}m</span>
              <span className="text-[10px] text-slate-500 block">{yacht.lengthFeet}ft</span>
            </div>
            <div className="space-y-0.5 border-l border-white/[0.06]">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-sans-clean">Guests</span>
              <span className="text-sm font-bold text-amber-200">{yacht.guests}</span>
              <span className="text-[10px] text-slate-500 block">{yacht.cabins} Cabins</span>
            </div>
            <div className="space-y-0.5 border-l border-white/[0.06]">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-sans-clean">Crew</span>
              <span className="text-sm font-bold text-amber-200">{yacht.crew}</span>
              <span className="text-[10px] text-slate-500 block">1:2 Ratio</span>
            </div>
            <div className="space-y-0.5 border-l border-white/[0.06]">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-sans-clean">Speed</span>
              <span className="text-sm font-bold text-amber-200">{yacht.cruisingSpeedKnots} kn</span>
              <span className="text-[10px] text-slate-500 block">Cruise</span>
            </div>
          </div>
        </section>

        {/* Curated Editorial Narrative */}
        <section className="px-4 space-y-3">
          <h3 className="text-xs uppercase tracking-widest font-semibold text-slate-300 font-mono">
            Vessel Provenance
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans-clean font-light">
            {yacht.description}
          </p>

          <div className="space-y-2 pt-2">
            {yacht.highlights.map((highlight, idx) => (
              <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                <span className="leading-snug">{highlight}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Interactive Deck Plan Component */}
        <section className="px-4">
          <DeckPlanViewer
            deckPlans={yacht.deckPlans}
            yachtName={yacht.name}
            lengthMeters={yacht.lengthMeters}
          />
        </section>

        {/* Luxury Appointments & Amenities */}
        <section className="px-4 space-y-3">
          <h3 className="text-xs uppercase tracking-widest font-semibold text-slate-300 font-mono">
            Onboard Appointments
          </h3>
          <div className="grid grid-cols-2 gap-2.5">
            {yacht.amenities.map((item, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl bg-[#0E1626] border border-white/[0.06] space-y-1.5"
              >
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0">
                    {getAmenityIcon(item.icon)}
                  </div>
                  <h4 className="text-xs font-medium text-slate-200 truncate">
                    {item.name}
                  </h4>
                </div>
                <p className="text-[11px] text-slate-400 leading-tight">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Water Toys & Tender Fleet */}
        <section className="px-4 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs uppercase tracking-widest font-semibold text-slate-300 font-mono">
              Tender & Toy Garage ({yacht.waterToys.length})
            </h3>
            <span className="text-[11px] text-amber-300/80 font-mono">Complimentary</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#0E1626] border border-white/[0.06] space-y-2">
            {yacht.waterToys.map((toy, idx) => (
              <div key={idx} className="flex items-center gap-2 text-xs text-slate-300 py-0.5">
                <span className="w-1 h-1 rounded-full bg-amber-400 shrink-0" />
                <span>{toy}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Assigned Charter Specialist Direct Contact */}
        <section className="mx-4 p-4 rounded-2xl bg-gradient-to-br from-[#0F1728] to-[#0A101C] border border-white/[0.08] space-y-3">
          <span className="text-[10px] font-mono tracking-widest uppercase text-amber-400 block">
            Dedicated Charter Atelier
          </span>

          <div className="flex items-center gap-3">
            <img
              src={yacht.brokerContact.avatar}
              alt={yacht.brokerContact.name}
              className="w-12 h-12 rounded-full object-cover border-2 border-amber-500/30 shrink-0"
            />
            <div>
              <h4 className="text-sm font-serif-luxury font-semibold text-slate-100">
                {yacht.brokerContact.name}
              </h4>
              <p className="text-xs text-slate-400">{yacht.brokerContact.title}</p>
              <p className="text-[11px] text-amber-300/80 font-mono">{yacht.brokerContact.office}</p>
            </div>
          </div>

          <p className="text-xs text-slate-400 leading-relaxed">
            Direct coordination for customs clearance, custom maritime route filings, Michelin provisioning, and Monaco Grand Prix berth assignments.
          </p>
        </section>
      </div>

      {/* Pinned Bottom Charter Booking CTA Bar (Section 4 Layout C) */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-[#080C14] via-[#080C14]/95 to-transparent backdrop-blur-md border-t border-white/[0.06] z-40 flex items-center justify-between">
        <div>
          <span className="text-[10px] font-mono uppercase text-slate-400 block">
            Charter Rate (MYBA Terms)
          </span>
          <div className="flex items-baseline gap-1">
            <span className="font-mono-numbers text-lg font-bold text-amber-300">
              €{(yacht.weeklyRateEuros / 1000).toLocaleString()}k
            </span>
            <span className="text-xs text-slate-400">/ week + APA</span>
          </div>
        </div>

        <button
          onClick={onStartBooking}
          className="h-12 px-6 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-[#090E17] font-semibold text-xs tracking-wider uppercase transition-all duration-200 flex items-center gap-2 shadow-lg shadow-amber-500/10 active:scale-[0.98]"
        >
          <span>Inquire Charter</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
