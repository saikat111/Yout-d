import React from 'react';
import { Compass, Map, Bookmark, ShieldCheck } from 'lucide-react';

export type NavTab = 'discover' | 'routes' | 'saved' | 'profile';

interface BottomNavProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
  savedCount: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onTabChange,
  savedCount,
}) => {
  const tabs = [
    {
      id: 'discover' as NavTab,
      label: 'Discover',
      icon: Compass,
    },
    {
      id: 'routes' as NavTab,
      label: 'Routes',
      icon: Map,
    },
    {
      id: 'saved' as NavTab,
      label: 'Saved',
      icon: Bookmark,
      badge: savedCount > 0 ? savedCount : undefined,
    },
    {
      id: 'profile' as NavTab,
      label: 'Private Client',
      icon: ShieldCheck,
    },
  ];

  return (
    <nav className="w-full h-16 shrink-0 bg-[#080C14]/95 backdrop-blur-xl border-t border-white/[0.08] grid grid-cols-4 items-center px-2 z-40 select-none">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;

        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className="group relative flex flex-col items-center justify-center min-h-[44px] min-w-[44px] py-1 transition-all duration-200 outline-none focus-visible:ring-1 focus-visible:ring-amber-400"
          >
            {/* Active Material 3 Indicator pill */}
            <div
              className={`relative px-4 py-1 rounded-full transition-all duration-300 flex items-center justify-center ${
                isActive
                  ? 'bg-amber-500/15 text-amber-300'
                  : 'text-slate-400 group-hover:text-slate-200'
              }`}
            >
              <Icon
                className={`w-5 h-5 transition-transform duration-200 ${
                  isActive ? 'scale-110 stroke-[2.2]' : 'scale-100 stroke-[1.8]'
                }`}
              />
              {tab.badge !== undefined && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-amber-400 text-[#080C14] text-[9px] font-bold flex items-center justify-center font-mono shadow-sm">
                  {tab.badge}
                </span>
              )}
            </div>

            <span
              className={`text-[10px] tracking-wider mt-0.5 font-medium transition-colors duration-200 ${
                isActive ? 'text-amber-200 font-semibold' : 'text-slate-400'
              }`}
            >
              {tab.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
};
