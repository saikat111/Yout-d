import React, { useState } from 'react';
import { ShieldCheck, PhoneCall, Mail, MessageSquare, Award, Anchor, Plane, Sparkles, Check, ChevronRight } from 'lucide-react';

interface ProfileViewProps {
  onOpenComposeInspector: () => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({ onOpenComposeInspector }) => {
  const [copiedContact, setCopiedContact] = useState<string | null>(null);

  const handleCopy = (val: string, label: string) => {
    navigator.clipboard?.writeText(val);
    setCopiedContact(label);
    setTimeout(() => setCopiedContact(null), 2000);
  };

  return (
    <div className="flex-1 overflow-y-auto no-scrollbar pb-6 space-y-6 bg-[#080C14] text-slate-100">
      {/* Header */}
      <header className="sticky top-0 z-30 px-5 pt-3 pb-3 bg-[#080C14]/90 backdrop-blur-md border-b border-white/[0.04]">
        <h1 className="text-xl font-serif-luxury font-medium tracking-[0.2em] text-slate-100">
          PRIVATE CLIENT
        </h1>
        <span className="text-[10px] uppercase tracking-widest text-amber-300/70 font-mono block -mt-0.5">
          Pelagos Concierge & Family Office
        </span>
      </header>

      {/* Member Card */}
      <section className="px-4">
        <div className="relative rounded-3xl p-5 bg-gradient-to-br from-[#121B2D] via-[#0D1524] to-[#070B14] border border-amber-500/30 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-300">
                <Anchor className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase text-amber-400 tracking-wider block">
                  PELAGOS BLACK CARD
                </span>
                <span className="text-xs text-slate-300 font-medium">Verified Charter Principal</span>
              </div>
            </div>
            <span className="text-[10px] font-mono text-slate-400">ID #PEL-9042</span>
          </div>

          <div className="pt-2">
            <span className="text-xs text-slate-400 block">Charter Principal</span>
            <h3 className="text-lg font-serif-luxury font-semibold text-white">
              Lord Harrington of Kensington
            </h3>
            <span className="text-xs text-slate-400">Harrington Maritime Family Trust</span>
          </div>

          <div className="pt-2 border-t border-white/[0.08] flex items-center justify-between text-xs font-mono">
            <span className="text-slate-400">Preferred Fleet: 70m+ Megayachts</span>
            <span className="text-amber-300">Monaco & Amalfi</span>
          </div>
        </div>
      </section>

      {/* Assigned Senior Charter Broker */}
      <section className="px-4 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs uppercase tracking-widest font-semibold text-slate-300 font-mono">
            Dedicated Charter Specialist
          </h3>
          <span className="text-[11px] text-emerald-400 font-medium flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Online Quayside
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-[#0E1626] border border-white/[0.06] space-y-4">
          <div className="flex items-center gap-3">
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80"
              alt="Alexander Vance"
              className="w-14 h-14 rounded-full object-cover border-2 border-amber-500/30 shrink-0"
            />
            <div>
              <h4 className="text-sm font-serif-luxury font-semibold text-slate-100">
                Alexander Vance
              </h4>
              <p className="text-xs text-slate-400">Managing Director, Private Client Charters</p>
              <p className="text-[11px] text-amber-300/80 font-mono">Monaco Yacht Club · Quai Antoine 1er</p>
            </div>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed font-sans-clean font-light">
            "Available 24/7 for bespoke maritime route filings, private island permits, and discreet luxury superyacht charters."
          </p>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              onClick={() => handleCopy('+377 98 06 20 00', 'phone')}
              className="p-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06] flex items-center justify-center gap-2 text-slate-200 transition-colors"
            >
              {copiedContact === 'phone' ? (
                <Check className="w-3.5 h-3.5 text-emerald-400" />
              ) : (
                <PhoneCall className="w-3.5 h-3.5 text-amber-400" />
              )}
              <span>+377 98 06 20 00</span>
            </button>

            <button
              onClick={() => handleCopy('vance@pelagos-marine.mc', 'email')}
              className="p-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06] flex items-center justify-center gap-2 text-slate-200 transition-colors"
            >
              {copiedContact === 'email' ? (
                <Check className="w-3.5 h-3.5 text-emerald-400" />
              ) : (
                <Mail className="w-3.5 h-3.5 text-amber-400" />
              )}
              <span>Direct Dispatch</span>
            </button>
          </div>
        </div>
      </section>

      {/* Concierge Services List */}
      <section className="px-4 space-y-3">
        <h3 className="text-xs uppercase tracking-widest font-semibold text-slate-300 font-mono">
          Private Aviation & Port Privileges
        </h3>

        <div className="space-y-2">
          {[
            {
              title: 'Monaco Heliport Tarmac Escort',
              desc: 'Seamless transfer from Nice Côte d’Azur airport (LFMN) directly to yacht deck',
              icon: Plane,
            },
            {
              title: 'Port Hercule Reserved Berthing',
              desc: 'Priority superyacht mooring for Monaco Grand Prix and Yacht Show',
              icon: Anchor,
            },
            {
              title: 'Domaine & Grand Cru Provisions',
              desc: 'Private cellar sourcing from Romanée-Conti and Château Cheval Blanc',
              icon: Sparkles,
            },
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-3.5 rounded-2xl bg-[#0E1626] border border-white/[0.06] flex items-start gap-3 text-xs"
              >
                <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-300 shrink-0 mt-0.5">
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <h5 className="font-medium text-slate-200">{item.title}</h5>
                  <p className="text-slate-400 text-[11px] leading-relaxed mt-0.5">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Developer / Client Technical Specs Action */}
      <section className="mx-4 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between">
        <div>
          <span className="text-xs font-semibold text-amber-200 block">
            Jetpack Compose Architecture
          </span>
          <span className="text-[11px] text-slate-400">
            Inspect Kotlin M3 UI tokens & unidirectional data flow
          </span>
        </div>
        <button
          onClick={onOpenComposeInspector}
          className="px-3 py-1.5 rounded-lg bg-amber-500 text-slate-950 font-semibold text-xs transition-colors hover:bg-amber-400"
        >
          View Specs
        </button>
      </section>
    </div>
  );
};
