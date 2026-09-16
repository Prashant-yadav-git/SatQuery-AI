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
  PanelLeft,
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
    <>
      {/* Mobile Backdrop Overlay when sidebar is expanded */}
      {isOpen && (
        <div
          onClick={onToggle}
          className="fixed inset-0 bg-slate-950/40 backdrop-blur-xs z-30 lg:hidden transition-opacity duration-200"
          aria-hidden="true"
        />
      )}

      {/* Main Sidebar Container:
          - On PC (lg:): toggles between full drawer (w-64/w-72) and compact icon rail (w-[68px])
          - On Phone/Tablet (< lg:): when closed, completely hidden off-screen (-translate-x-full); when open, slides in as full drawer with backdrop
      */}
      <aside
        id="main-sidebar"
        className={`fixed lg:static top-0 left-0 z-40 lg:z-30 h-[calc(100vh-1rem)] lg:h-[calc(100vh-2rem)] rounded-[24px] lg:rounded-[28px] glass-panel border border-white/80 shadow-2xl flex flex-col select-none shrink-0 overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen
            ? 'w-72 sm:w-76 lg:w-64 xl:w-72 translate-x-0 opacity-100 pointer-events-auto my-2 lg:my-4 ml-2 lg:ml-4'
            : 'max-lg:-translate-x-[120%] max-lg:opacity-0 max-lg:pointer-events-none max-lg:w-0 max-lg:m-0 max-lg:p-0 max-lg:border-0 lg:w-[68px] lg:translate-x-0 lg:opacity-100 lg:pointer-events-auto lg:my-4 lg:ml-4'
        }`}
      >
        {/* ==================================================================== */}
        {/* COLLAPSED STATE: Sleek Icon Rail - VISIBLE ONLY ON PC (lg:flex)     */}
        {/* ==================================================================== */}
        {!isOpen && (
          <div className="hidden lg:flex h-full w-full flex-col items-center py-3.5 px-2 justify-between animate-in fade-in duration-200">
            {/* Top Area: Expand / Toggle Button + Brand Logo */}
            <div className="flex flex-col items-center gap-2.5 w-full">
              {/* Expand Toggle Button with Tooltip */}
              <div className="relative group/tip">
                <button
                  onClick={onToggle}
                  className="w-10 h-10 rounded-2xl bg-[#060b17] text-white flex items-center justify-center shadow-md border border-white/20 hover:scale-105 active:scale-95 transition-all cursor-pointer"
                  title="Expand sidebar"
                  aria-label="Expand sidebar"
                >
                  <SatQueryLogo className="w-full h-full p-1" />
                </button>
                <div className="pointer-events-none absolute left-full ml-3 top-1/2 -translate-y-1/2 px-2.5 py-1 rounded-xl bg-slate-900 text-white text-[11px] font-semibold whitespace-nowrap opacity-0 scale-95 group-hover/tip:opacity-100 group-hover/tip:scale-100 transition-all duration-150 z-50 shadow-xl border border-white/10">
                  <span>Open sidebar</span>
                  <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-slate-900" />
                </div>
              </div>

              {/* Sidebar Expand Icon Button */}
              <div className="relative group/tip">
                <button
                  onClick={onToggle}
                  className="w-10 h-10 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-white/80 flex items-center justify-center transition-colors cursor-pointer"
                  title="Open sidebar"
                  aria-label="Open sidebar"
                >
                  <PanelLeft className="w-4 h-4" />
                </button>
                <div className="pointer-events-none absolute left-full ml-3 top-1/2 -translate-y-1/2 px-2.5 py-1 rounded-xl bg-slate-900 text-white text-[11px] font-semibold whitespace-nowrap opacity-0 scale-95 group-hover/tip:opacity-100 group-hover/tip:scale-100 transition-all duration-150 z-50 shadow-xl border border-white/10">
                  <span>Open sidebar</span>
                  <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-slate-900" />
                </div>
              </div>

              {/* Divider */}
              <div className="w-8 h-px bg-slate-200/80 my-1" />

              {/* Core Quick Action: New Chat (Highlighted like ChatGPT) */}
              <div className="relative group/tip">
                <button
                  onClick={() => onSelectTab('new-chat')}
                  className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all cursor-pointer shadow-xs ${
                    currentTab === 'new-chat'
                      ? 'bg-slate-900 text-white shadow-md ring-2 ring-blue-500/40'
                      : 'bg-white/80 hover:bg-white text-slate-800 border border-slate-200/70 hover:scale-105 active:scale-95'
                  }`}
                  title="New chat"
                  aria-label="New chat"
                >
                  <MessageSquarePlus className="w-4 h-4" />
                </button>
                <div className="pointer-events-none absolute left-full ml-3 top-1/2 -translate-y-1/2 px-2.5 py-1 rounded-xl bg-slate-900 text-white text-[11px] font-semibold whitespace-nowrap opacity-0 scale-95 group-hover/tip:opacity-100 group-hover/tip:scale-100 transition-all duration-150 z-50 shadow-xl border border-white/10">
                  <span>New Chat</span>
                  <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-slate-900" />
                </div>
              </div>

              {/* Nav Icons list */}
              <div className="flex flex-col items-center gap-2 mt-1">
                {[
                  { id: 'home', label: 'Home', icon: Home },
                  { id: 'explore', label: 'Explore', icon: Compass },
                  { id: 'my-analyses', label: 'My Analyses', icon: FolderKanban },
                  { id: 'saved', label: 'Saved', icon: Bookmark },
                  { id: 'reports', label: 'Reports', icon: BarChart3 },
                  { id: 'settings', label: 'Settings', icon: Settings },
                ].map((item) => {
                  const Icon = item.icon;
                  const isActive = currentTab === item.id;
                  return (
                    <div key={item.id} className="relative group/tip">
                      <button
                        onClick={() => onSelectTab(item.id)}
                        className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all cursor-pointer ${
                          isActive
                            ? 'bg-slate-900 text-white shadow-md'
                            : 'text-slate-500 hover:text-slate-900 hover:bg-white/80'
                        }`}
                        title={item.label}
                        aria-label={item.label}
                      >
                        <Icon className="w-4 h-4" />
                      </button>
                      <div className="pointer-events-none absolute left-full ml-3 top-1/2 -translate-y-1/2 px-2.5 py-1 rounded-xl bg-slate-900 text-white text-[11px] font-semibold whitespace-nowrap opacity-0 scale-95 group-hover/tip:opacity-100 group-hover/tip:scale-100 transition-all duration-150 z-50 shadow-xl border border-white/10">
                        <span>{item.label}</span>
                        <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-slate-900" />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Bottom Profile Avatar in Collapsed Rail */}
            <div className="relative group/tip pt-2 border-t border-slate-200/80 w-full flex justify-center">
              <button
                onClick={() => onSelectTab('profile')}
                className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs tracking-wider transition-all cursor-pointer shadow-xs ${
                  currentTab === 'profile'
                    ? 'bg-blue-600 text-white ring-2 ring-blue-400'
                    : 'bg-slate-900 text-white hover:scale-105'
                }`}
                title="Prashant Yadav (Profile)"
                aria-label="Profile"
              >
                PY
              </button>
              <div className="pointer-events-none absolute left-full ml-3 top-1/2 -translate-y-1/2 px-2.5 py-1 rounded-xl bg-slate-900 text-white text-[11px] font-semibold whitespace-nowrap opacity-0 scale-95 group-hover/tip:opacity-100 group-hover/tip:scale-100 transition-all duration-150 z-50 shadow-xl border border-white/10">
                <span>Prashant Yadav</span>
                <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-slate-900" />
              </div>
            </div>
          </div>
        )}

        {/* ==================================================================== */}
        {/* EXPANDED STATE: Full Drawer with Brand, GooeyNav, and Profile Card   */}
        {/* ==================================================================== */}
        {isOpen && (
          <div className="h-full w-full flex flex-col animate-in fade-in duration-200">
            {/* Brand Header */}
            <div className="p-4 pb-2 shrink-0">
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
                  aria-label="Collapse sidebar"
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
                onSelect={(id) => {
                  onSelectTab(id);
                  if (window.innerWidth < 1024) {
                    onToggle();
                  }
                }}
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
          </div>
        )}
      </aside>
    </>
  );
};


