import React, { useState } from 'react';
import { X, Calendar, MapPin, Users, Sparkles, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';
import { Yacht } from '../types/yacht';

interface BookingSheetProps {
  isOpen: boolean;
  onClose: () => void;
  yacht: Yacht;
}

export const BookingSheet: React.FC<BookingSheetProps> = ({ isOpen, onClose, yacht }) => {
  const [step, setStep] = useState<'details' | 'confirmation'>('details');
  const [embarkationPort, setEmbarkationPort] = useState('Port Hercule, Monaco');
  const [charterWeeks, setCharterWeeks] = useState(1);
  const [guestCount, setGuestCount] = useState(8);
  const [wantsHelicopter, setWantsHelicopter] = useState(true);
  const [wantsPrivateChef, setWantsPrivateChef] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const totalEstimate = yacht.weeklyRateEuros * charterWeeks;
  // APA (Advanced Provisioning Allowance - standard 30% in luxury yachting)
  const apaEstimate = Math.round(totalEstimate * 0.3);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setStep('confirmation');
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-end bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      {/* Background click dismiss */}
      <div className="flex-1" onClick={onClose} />

      {/* Bottom Sheet Container */}
      <div className="relative w-full max-h-[85vh] bg-[#0C121F] border-t border-slate-700/80 rounded-t-[32px] shadow-2xl flex flex-col overflow-hidden text-slate-100 animate-in slide-in-from-bottom duration-300">
        {/* Android Grab Handle */}
        <div className="w-10 h-1 bg-slate-600 rounded-full mx-auto my-3 shrink-0" />

        {/* Sheet Header */}
        <div className="px-6 pb-3 pt-1 border-b border-white/[0.06] flex items-center justify-between shrink-0">
          <div>
            <span className="text-[10px] font-mono tracking-widest text-amber-400 uppercase">
              Charter Atelier
            </span>
            <h3 className="text-lg font-serif-luxury font-semibold text-slate-100">
              {step === 'details' ? `Reserve ${yacht.name}` : 'Charter Inscription Confirmed'}
            </h3>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/[0.06] hover:bg-white/[0.12] flex items-center justify-center text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Sheet Body */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-5 no-scrollbar">
          {step === 'details' ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Yacht summary snippet */}
              <div className="p-3 rounded-xl bg-[#121A2B] border border-white/[0.06] flex items-center justify-between text-xs">
                <div>
                  <span className="text-slate-400 block text-[11px]">Selected Vessel</span>
                  <span className="font-semibold text-slate-100">{yacht.name} · {yacht.lengthMeters}m</span>
                </div>
                <div className="text-right">
                  <span className="text-slate-400 block text-[11px]">Base Charter</span>
                  <span className="font-mono-numbers text-amber-300 font-semibold">
                    €{(yacht.weeklyRateEuros / 1000).toLocaleString()}k / wk
                  </span>
                </div>
              </div>

              {/* Port & Destination */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-amber-400" />
                  Embarkation Marina
                </label>
                <select
                  value={embarkationPort}
                  onChange={(e) => setEmbarkationPort(e.target.value)}
                  className="w-full h-11 px-3 rounded-xl bg-[#080D17] border border-slate-700 text-xs text-slate-200 focus:outline-none focus:border-amber-400 transition-colors"
                >
                  <option value="Port Hercule, Monaco">Port Hercule, Monaco</option>
                  <option value="Marina di Portofino, Italy">Marina di Portofino, Italy</option>
                  <option value="Port de Saint-Tropez, France">Port de Saint-Tropez, France</option>
                  <option value="Porto Cervo, Sardinia">Porto Cervo, Sardinia</option>
                  <option value="Marina Grande, Capri">Marina Grande, Capri</option>
                  <option value="Gustavia, St. Barths">Gustavia, St. Barths (Caribbean)</option>
                </select>
              </div>

              {/* Duration & Guests */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-amber-400" />
                    Duration
                  </label>
                  <div className="flex items-center justify-between h-11 px-3 rounded-xl bg-[#080D17] border border-slate-700 text-xs text-slate-200">
                    <span>{charterWeeks} {charterWeeks === 1 ? 'Week' : 'Weeks'}</span>
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => setCharterWeeks(Math.max(1, charterWeeks - 1))}
                        className="w-6 h-6 rounded bg-slate-800 text-slate-300 hover:text-white flex items-center justify-center font-mono"
                      >
                        -
                      </button>
                      <button
                        type="button"
                        onClick={() => setCharterWeeks(charterWeeks + 1)}
                        className="w-6 h-6 rounded bg-slate-800 text-slate-300 hover:text-white flex items-center justify-center font-mono"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-amber-400" />
                    Guests
                  </label>
                  <div className="flex items-center justify-between h-11 px-3 rounded-xl bg-[#080D17] border border-slate-700 text-xs text-slate-200">
                    <span>{guestCount} Guests</span>
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => setGuestCount(Math.max(2, guestCount - 1))}
                        className="w-6 h-6 rounded bg-slate-800 text-slate-300 hover:text-white flex items-center justify-center font-mono"
                      >
                        -
                      </button>
                      <button
                        type="button"
                        onClick={() => setGuestCount(Math.min(yacht.guests, guestCount + 1))}
                        className="w-6 h-6 rounded bg-slate-800 text-slate-300 hover:text-white flex items-center justify-center font-mono"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bespoke Services Toggle */}
              <div className="space-y-2 pt-1">
                <span className="text-xs font-medium text-slate-300 block">Bespoke Concierge Inclusions</span>
                
                <label className="flex items-center justify-between p-2.5 rounded-xl bg-[#090E18] border border-white/[0.04] cursor-pointer hover:border-slate-700 text-xs">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <div>
                      <span className="font-medium text-slate-200 block">Helicopter / Private Jet Transfer</span>
                      <span className="text-[11px] text-slate-400">Direct tarmac escort to yacht boarding tender</span>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={wantsHelicopter}
                    onChange={(e) => setWantsHelicopter(e.target.checked)}
                    className="w-4 h-4 rounded text-amber-500 bg-slate-800 border-slate-600 focus:ring-0"
                  />
                </label>

                <label className="flex items-center justify-between p-2.5 rounded-xl bg-[#090E18] border border-white/[0.04] cursor-pointer hover:border-slate-700 text-xs">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-amber-400" />
                    <div>
                      <span className="font-medium text-slate-200 block">Michelin Sommelier & Provisions</span>
                      <span className="text-[11px] text-slate-400">Grand Cru cellar curation tailored to preference</span>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={wantsPrivateChef}
                    onChange={(e) => setWantsPrivateChef(e.target.checked)}
                    className="w-4 h-4 rounded text-amber-500 bg-slate-800 border-slate-600 focus:ring-0"
                  />
                </label>
              </div>

              {/* Financial Breakdown */}
              <div className="p-3.5 rounded-xl bg-[#0A101C] border border-amber-500/20 text-xs space-y-1.5 font-mono-numbers">
                <div className="flex items-center justify-between text-slate-400">
                  <span>Base Rate ({charterWeeks} wk)</span>
                  <span>€{totalEstimate.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between text-slate-400">
                  <span>Est. APA (Fuel, Food, Berths ~30%)</span>
                  <span>€{apaEstimate.toLocaleString()}</span>
                </div>
                <div className="pt-2 border-t border-white/[0.08] flex items-center justify-between text-sm font-semibold text-amber-300">
                  <span className="font-sans-clean font-medium">Estimated Total</span>
                  <span>€{(totalEstimate + apaEstimate).toLocaleString()}</span>
                </div>
              </div>

              {/* Broker Contact Preview */}
              <div className="flex items-center gap-3 p-3 rounded-xl bg-[#101726] border border-white/[0.04]">
                <img
                  src={yacht.brokerContact.avatar}
                  alt={yacht.brokerContact.name}
                  className="w-10 h-10 rounded-full object-cover border border-amber-500/30 shrink-0"
                />
                <div className="text-xs">
                  <span className="text-[10px] text-slate-400 block font-mono">Assigned Senior Broker</span>
                  <span className="font-medium text-slate-200 block">{yacht.brokerContact.name}</span>
                  <span className="text-[11px] text-amber-300/80">{yacht.brokerContact.office}</span>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-12 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-[#090E17] font-semibold text-xs tracking-wider uppercase transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-amber-500/10 active:scale-[0.98]"
              >
                {isSubmitting ? (
                  <span>Securing Calendar Hold...</span>
                ) : (
                  <>
                    <span>Submit Private Charter Request</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          ) : (
            /* Confirmation State */
            <div className="py-6 flex flex-col items-center text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <span className="text-[11px] font-mono tracking-widest uppercase text-amber-400">
                  Priority Inscription Confirmed
                </span>
                <h4 className="text-xl font-serif-luxury font-semibold text-slate-100 mt-1">
                  Reference #PEL-88241
                </h4>
                <p className="text-xs text-slate-400 max-w-xs mx-auto mt-2 leading-relaxed">
                  Your inquiry for <strong className="text-slate-200">{yacht.name}</strong> from {embarkationPort} has been routed to {yacht.brokerContact.name}.
                </p>
              </div>

              <div className="w-full p-4 rounded-xl bg-[#090E19] border border-white/[0.06] text-xs text-left space-y-2">
                <div className="flex items-center justify-between text-slate-400">
                  <span>Vessel</span>
                  <span className="text-slate-200 font-medium">{yacht.name} ({yacht.lengthMeters}m)</span>
                </div>
                <div className="flex items-center justify-between text-slate-400">
                  <span>Broker Response Time</span>
                  <span className="text-emerald-400 font-medium">&lt; 15 minutes (Direct WhatsApp / Call)</span>
                </div>
                <div className="flex items-center justify-between text-slate-400">
                  <span>Marina Berth Hold</span>
                  <span className="text-amber-300 font-medium">48-Hour Priority Window</span>
                </div>
              </div>

              <button
                onClick={onClose}
                className="w-full h-11 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium transition-colors"
              >
                Return to Discovery
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
