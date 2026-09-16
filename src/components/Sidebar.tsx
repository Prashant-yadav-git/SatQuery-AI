import React from 'react';
import {
  Home,
  MessageSquarePlus,
  Compass,
  FolderKanban,
  Bookmark,
  BarChart3,
  Settings,
  PanelLeftClose,
} from 'lucide-react';
import { SatQueryLogo } from './SatQueryLogo';
import GooeyNav, { GooeyNavItem } from './GooeyNav';

interface SidebarProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  isOpen: boolean;
  onToggle: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onSelectTab,
  isOpen,
  onToggle,
}) => {
  if (!isOpen) return null;

  const navItems: GooeyNavItem[] = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'new-chat', label: 'New Chat', icon: MessageSquarePlus },
    { id: 'explore', label: 'Explore', icon: Compass },
    { id: 'my-analyses', label: 'My Analyses', icon: FolderKanban },
    { id: 'saved', label: 'Saved', icon: Bookmark },
    { id: 'reports', label: 'Reports', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings, hasDividerBefore: true },
    {
      id: 'profile',
      label: 'Profile',
      isProfile: true,
      hasDividerBefore: true,
      user: {
        name: 'Prashant Yadav',
        email: 'prashanty@psit.ac.in',
        initials: 'PY',
      },
    },
  ];

  const activeIndex = Math.max(
    0,
    navItems.findIndex((item) => item.id === currentTab)
  );

  return (
    <aside
      id="main-sidebar"
      className="w-64 xl:w-72 h-[calc(100vh-2rem)] my-4 ml-4 rounded-[28px] glass-panel border border-white/60 shadow-2xl flex flex-col select-none z-30 shrink-0 overflow-hidden"
    >
      {/* Brand Header */}
      <div className="p-4 pb-2">
        <div className="flex items-center justify-between px-2 py-1 mb-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#060b17] text-white flex items-center justify-center shadow-lg border border-white/20 overflow-hidden shrink-0 group hover:scale-105 transition-transform">
              <SatQueryLogo className="w-full h-full" />
            </div>
            <div>
              <h1 className="font-bold text-sm tracking-tight text-slate-900 flex items-center gap-1.5">
                SatQuery AI
              </h1>
              <p className="text-[10px] text-slate-500 font-medium">
                Ask the Earth. Get Answers.
              </p>
            </div>
          </div>

          <button
            onClick={onToggle}
            className="w-7 h-7 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100/80 flex items-center justify-center transition-colors cursor-pointer"
            title="Collapse sidebar"
          >
            <PanelLeftClose className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Interactive GooeyNav rows */}
      <div className="flex-1 min-h-0 px-3 pb-3 flex flex-col">
        <GooeyNav
          items={navItems}
          activeIndex={activeIndex}
          onSelect={(id) => onSelectTab(id)}
          particleCount={8}
          particleDistances={[22, 6]}
          particleR={35}
          animationTime={380}
          timeVariance={100}
          colors={[1, 2, 3, 4]}
          vertical={true}
          className="h-full flex-1 flex flex-col"
        />
      </div>
    </aside>
  );
};

