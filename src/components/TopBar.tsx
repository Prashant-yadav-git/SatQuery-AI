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
    <header className="h-16 w-full px-3 sm:px-6 py-3 flex items-center justify-between gap-2 sm:gap-4 select-none z-20 shrink-0">
      <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0 max-w-2xl">
        {/* Toggle Button: always accessible on mobile screens, or when desktop sidebar is collapsed */}
        <div className={`flex items-center gap-2 shrink-0 ${isSidebarOpen ? 'lg:hidden' : 'flex'}`}>
          <button
            onClick={onToggleSidebar}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl glass-panel border border-white/80 text-slate-700 hover:text-slate-950 flex items-center justify-center shadow-xs transition-colors shrink-0 cursor-pointer active:scale-95"
            title="Toggle navigation"
            aria-label="Toggle navigation menu"
          >
            <PanelLeft className="w-4 h-4" />
          </button>
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-2xl bg-[#060b17] border border-white/20 shadow-sm overflow-hidden flex items-center justify-center shrink-0">
            <SatQueryLogo className="w-full h-full" />
          </div>
        </div>

        {/* Global Glass Search Bar */}
        <div
          onClick={onOpenSearch}
          className="flex-1 flex items-center justify-between px-3 sm:px-4 py-2 rounded-2xl glass-panel border border-white/80 shadow-xs hover:border-slate-300/80 transition-all cursor-text group min-w-0"
        >
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <Search className="w-4 h-4 text-slate-400 group-hover:text-slate-600 transition-colors shrink-0" />
            <span className="text-xs sm:text-sm text-slate-500 font-normal truncate">
              <span className="hidden sm:inline">Search locations, analyze changes, or ask anything...</span>
              <span className="sm:hidden">Ask or search Earth...</span>
            </span>
          </div>
          <span className="hidden sm:inline-block text-[10px] font-semibold text-slate-500 px-2 py-0.5 rounded-lg bg-white/70 border border-slate-200/80 shrink-0 shadow-2xs font-mono">
            Ctrl K
          </span>
        </div>
      </div>

      {/* Right User & Notification Controls */}
      <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
        {/* Notification Bell */}
        <button
          onClick={() => alert('All satellite passes & telemetry channels are nominal.')}
          className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-2xl glass-panel border border-white/80 text-slate-600 hover:text-slate-900 flex items-center justify-center shadow-xs transition-colors cursor-pointer"
          title="Notifications"
          aria-label="Notifications"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-2 sm:top-2.5 right-2 sm:right-2.5 w-2 h-2 rounded-full bg-blue-600 ring-2 ring-white" />
        </button>

        {/* User Pill */}
        <div className="flex items-center gap-2 pl-1.5 sm:pl-2 pr-2 sm:pr-3 py-1 sm:py-1.5 rounded-2xl glass-panel border border-white/80 shadow-xs hover:bg-white/80 transition-colors cursor-pointer">
          <div className="w-7 h-7 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-xs tracking-wider shadow-xs shrink-0">
            PY
          </div>
          <span className="text-xs font-semibold text-slate-800 hidden md:inline truncate max-w-[110px]">
            Prashant Yadav
          </span>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block shrink-0" />
        </div>
      </div>
    </header>
  );
};
