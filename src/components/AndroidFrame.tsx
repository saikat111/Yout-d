import React, { useState, useEffect } from 'react';
import { Wifi, BatteryMedium, Signal, Smartphone, Maximize2, Code2, Sparkles } from 'lucide-react';

interface AndroidFrameProps {
  children: React.ReactNode;
  onOpenComposeInspector: () => void;
  title?: string;
}

export const AndroidFrame: React.FC<AndroidFrameProps> = ({
  children,
  onOpenComposeInspector,
}) => {
  const [currentTime, setCurrentTime] = useState('10:42');
  const [deviceFrameEnabled, setDeviceFrameEnabled] = useState(true);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const mins = now.getMinutes().toString().padStart(2, '0');
      setCurrentTime(`${hours}:${mins}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#06090F] flex flex-col items-center justify-start sm:py-6 px-0 sm:px-4 text-slate-100 font-sans-clean antialiased selection:bg-amber-500/20 selection:text-amber-200">
      {/* Studio Top Control Strip (Desktop Only) */}
      <header className="hidden sm:flex items-center justify-between w-full max-w-[430px] md:max-w-[760px] lg:max-w-[900px] mb-4 px-4 py-2 bg-slate-900/60 backdrop-blur-md rounded-2xl border border-slate-800 text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-medium text-slate-200 tracking-wide">PELAGOS ATELIER</span>
          <span className="text-slate-600">|</span>
          <span className="text-slate-400">Android 15 · Jetpack Compose Prototype</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setDeviceFrameEnabled(!deviceFrameEnabled)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
            title="Toggle Android Device Shell"
          >
            {deviceFrameEnabled ? (
              <>
                <Maximize2 className="w-3.5 h-3.5 text-amber-400" />
                <span>Full Canvas</span>
              </>
            ) : (
              <>
                <Smartphone className="w-3.5 h-3.5 text-amber-400" />
                <span>Device Shell</span>
              </>
            )}
          </button>

          <button
            onClick={onOpenComposeInspector}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/20 transition-colors font-medium"
            title="Inspect Compose Kotlin Architecture"
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>Jetpack Compose Specs</span>
          </button>
        </div>
      </header>

      {/* Main Container / Device Frame */}
      <main
        className={`relative transition-all duration-300 w-full ${
          deviceFrameEnabled
            ? 'max-w-[420px] sm:h-[890px] sm:rounded-[52px] sm:border-[10px] sm:border-[#1E2533] sm:shadow-[0_25px_70px_rgba(0,0,0,0.85),0_0_0_1px_rgba(255,255,255,0.08)] overflow-hidden bg-[#080C14] flex flex-col'
            : 'max-w-md h-screen sm:h-[90vh] sm:rounded-3xl border border-slate-800 overflow-hidden bg-[#080C14] flex flex-col shadow-2xl'
        }`}
      >
        {/* Android Punch Hole Camera (on device frame) */}
        {deviceFrameEnabled && (
          <div className="hidden sm:block absolute top-3 left-1/2 -translate-x-1/2 z-50 pointer-events-none">
            <div className="w-3.5 h-3.5 rounded-full bg-black border border-slate-800/80 shadow-inner flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-[#0a1120]" />
            </div>
          </div>
        )}

        {/* Android System Status Bar (Material 3 style) */}
        <div className="w-full h-11 px-6 pt-2 pb-1 flex items-center justify-between text-xs text-slate-300/90 select-none shrink-0 z-40 bg-[#080C14]/90 backdrop-blur-md border-b border-white/[0.04]">
          <span className="font-mono-numbers text-[13px] font-semibold tracking-tight text-slate-200">
            {currentTime}
          </span>

          <div className="flex items-center gap-2 text-slate-300">
            <span className="text-[10px] font-mono font-medium tracking-wider text-amber-400/90">5G</span>
            <Signal className="w-3.5 h-3.5 stroke-[2.2]" />
            <Wifi className="w-3.5 h-3.5 stroke-[2.2]" />
            <div className="flex items-center gap-1">
              <span className="text-[10px] font-mono-numbers text-slate-400">94%</span>
              <BatteryMedium className="w-4 h-4 stroke-[2]" />
            </div>
          </div>
        </div>

        {/* Screen Viewport & Body */}
        <div className="flex-1 overflow-hidden relative flex flex-col bg-[#080C14]">
          {children}
        </div>

        {/* Android 15 Gesture Navigation Bar Pill */}
        <div className="w-full h-5 shrink-0 bg-[#080C14] flex items-center justify-center select-none pointer-events-none z-50 pb-1">
          <div className="w-32 h-1 bg-slate-500/40 rounded-full" />
        </div>
      </main>

      {/* Mobile Floating Inspector Pill (Only visible on small touchscreens) */}
      <button
        onClick={onOpenComposeInspector}
        className="sm:hidden fixed bottom-6 right-4 z-50 flex items-center gap-1.5 px-3 py-2 rounded-full bg-slate-900/95 border border-amber-500/40 text-amber-300 text-xs shadow-xl backdrop-blur-md"
      >
        <Code2 className="w-3.5 h-3.5" />
        <span>Compose Spec</span>
      </button>
    </div>
  );
};
