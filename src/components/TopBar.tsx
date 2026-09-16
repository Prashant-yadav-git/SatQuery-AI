import React from 'react';
import { Search, Bell, ChevronDown, PanelLeft } from 'lucide-react';
import { SatQueryLogo } from './SatQueryLogo';

interface TopBarProps {
  isSidebarOpen: boolean;
  onToggleSidebar: () => void;
  onOpenSearch?: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  isSidebarOpen,
  onToggleSidebar,
  onOpenSearch,
}) => {
  return (
    <header className="h-16 w-full px-6 py-3 flex items-center justify-between gap-4 select-none z-20">
      <div className="flex items-center gap-3 flex-1 max-w-2xl">
        {!isSidebarOpen && (
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={onToggleSidebar}
              className="w-10 h-10 rounded-2xl glass-panel border border-white/60 text-slate-600 hover:text-slate-900 flex items-center justify-center shadow-xs transition-colors shrink-0"
              title="Open sidebar"
            >
              <PanelLeft className="w-4 h-4" />
            </button>
            <div className="w-9 h-9 rounded-2xl bg-[#060b17] border border-white/20 shadow-sm overflow-hidden flex items-center justify-center shrink-0">
              <SatQueryLogo className="w-full h-full" />
            </div>
          </div>
        )}

        {/* Global Glass Search Bar */}
        <div
          onClick={onOpenSearch}
          className="flex-1 flex items-center justify-between px-4 py-2 rounded-2xl glass-panel border border-white/80 shadow-xs hover:border-slate-300/80 transition-all cursor-text group"
        >
          <div className="flex items-center gap-3 min-w-0">
            <Search className="w-4 h-4 text-slate-400 group-hover:text-slate-600 transition-colors shrink-0" />
            <span className="text-xs sm:text-sm text-slate-400 font-normal truncate">
              Search locations, analyze changes, or ask anything...
            </span>
          </div>
          <span className="text-[10px] font-semibold text-slate-500 px-2 py-0.5 rounded-lg bg-white/70 border border-slate-200/80 shrink-0 shadow-2xs font-mono">
            Ctrl K
          </span>
        </div>
      </div>

      {/* Right User & Notification Controls */}
      <div className="flex items-center gap-3 shrink-0">
        {/* Notification Bell */}
        <button
          onClick={() => alert('All satellite passes & telemetry channels are nominal.')}
          className="relative w-10 h-10 rounded-2xl glass-panel border border-white/80 text-slate-600 hover:text-slate-900 flex items-center justify-center shadow-xs transition-colors"
          title="Notifications"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-blue-600 ring-2 ring-white" />
        </button>

        {/* User Pill */}
        <div className="flex items-center gap-2.5 pl-2 pr-3 py-1.5 rounded-2xl glass-panel border border-white/80 shadow-xs hover:bg-white/80 transition-colors cursor-pointer">
          <div className="w-7 h-7 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-xs tracking-wider shadow-xs">
            PY
          </div>
          <span className="text-xs font-semibold text-slate-800 hidden sm:inline">
            Prashant Yadav
          </span>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
        </div>
      </div>
    </header>
  );
};
