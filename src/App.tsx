import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { TopBar } from './components/TopBar';
import { HeroSection } from './components/HeroSection';
import { QueryInputCard } from './components/QueryInputCard';
import { FeatureCards } from './components/FeatureCards';
import { RecentAnalyses } from './components/RecentAnalyses';
import { PromoBanner } from './components/PromoBanner';
import { AnalysisModal } from './components/AnalysisModal';
import { ChatView } from './components/ChatView';
import { createAnalysisFromQuery } from './data/mockData';
import { AnalysisItem } from './types';

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
  const [selectedAnalysis, setSelectedAnalysis] = useState<AnalysisItem | null>(null);
  const [activeQueryForChat, setActiveQueryForChat] = useState<string>('');

  // Real user-generated analyses state (stored in localStorage)
  const [analyses, setAnalyses] = useState<AnalysisItem[]>(() => {
    try {
      const saved = localStorage.getItem('satquery_analyses');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const addAnalysis = (item: AnalysisItem) => {
    setAnalyses((prev) => {
      const updated = [item, ...prev.filter((a) => a.id !== item.id)];
      try {
        localStorage.setItem('satquery_analyses', JSON.stringify(updated));
      } catch (err) {
        console.error('Failed to save to localStorage', err);
      }
      return updated;
    });
  };

  const handleQuerySubmit = (query: string) => {
    const newAnalysis = createAnalysisFromQuery(query);
    addAnalysis(newAnalysis);
    setActiveQueryForChat(query);
    setCurrentTab('new-chat');
  };

  const handleFeatureCardClick = (id: string) => {
    if (id === 'ask' || id === 'upload') {
      setCurrentTab('new-chat');
    } else {
      if (analyses.length > 0) {
        setSelectedAnalysis(analyses[0]);
      } else {
        const sample = createAnalysisFromQuery('Multi-temporal land cover change detection');
        addAnalysis(sample);
        setSelectedAnalysis(sample);
      }
    }
  };

  return (
    <div className="relative min-h-screen w-full flex bg-[#edf1f5] text-slate-900 font-['Plus_Jakarta_Sans',sans-serif] overflow-x-hidden selection:bg-blue-500/20">
      {/* ATMOSPHERIC SPACE & EARTH BACKGROUND LAYER (Exact to reference) */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Deep space top-right corner */}
        <div className="absolute top-0 right-0 w-[55vw] h-[55vw] max-w-[850px] max-h-[850px] rounded-full bg-radial from-slate-950 via-[#0d1627] to-transparent opacity-95 translate-x-1/4 -translate-y-1/4" />

        {/* Earth sphere glowing limb with blue atmosphere */}
        <div className="absolute top-[-10%] right-[-10%] w-[50vw] h-[50vw] max-w-[700px] max-h-[700px] rounded-full bg-radial from-transparent via-blue-500/25 to-transparent blur-2xl" />

        {/* Photorealistic curved Earth horizon texture overlay */}
        <div
          className="absolute top-0 right-0 w-[48vw] h-[48vw] max-w-[650px] max-h-[650px] rounded-full opacity-70 bg-cover bg-center pointer-events-none mix-blend-screen"
          style={{
            backgroundImage:
              'radial-gradient(circle at 35% 35%, rgba(59, 130, 246, 0.4) 0%, rgba(15, 23, 42, 0.95) 75%)',
          }}
        />

        {/* Soft diffused white & light-gray cloud mist on left/bottom */}
        <div className="absolute inset-0 bg-gradient-to-tr from-[#f3f5f8] via-[#edf1f5]/90 to-transparent" />
      </div>

      {/* FLOATING FROSTED GLASS SIDEBAR */}
      <Sidebar
        currentTab={currentTab}
        onSelectTab={(tab) => {
          if (tab === 'new-chat') {
            setActiveQueryForChat('');
          }
          setCurrentTab(tab);
        }}
        isOpen={isSidebarOpen}
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
      />

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col min-w-0 z-10 relative h-screen overflow-y-auto">
        {/* Top Glass Header */}
        <TopBar
          isSidebarOpen={isSidebarOpen}
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          onOpenSearch={() => setCurrentTab('new-chat')}
        />

        {/* TAB 1: HOME DASHBOARD */}
        {currentTab === 'home' && (
          <main className="flex-1 px-3 sm:px-6 lg:px-8 pb-10 max-w-7xl w-full mx-auto space-y-3.5 sm:space-y-4">
            {/* Hero Section */}
            <HeroSection
              onOpenLiveEarth={() => {
                if (analyses.length > 0) {
                  setSelectedAnalysis(analyses[0]);
                } else {
                  handleQuerySubmit('Real-time Live Earth surface observation');
                }
              }}
            />

            {/* 4 Feature Cards */}
            <FeatureCards onCardClick={handleFeatureCardClick} />

            {/* AI Query Bar / Chat Box */}
            <QueryInputCard
              onSubmitQuery={handleQuerySubmit}
              onAttachImage={() => setCurrentTab('new-chat')}
            />

            {/* Recent Analyses Section */}
            <div className="px-1 sm:px-4 py-1 sm:py-2">
              <RecentAnalyses
                items={analyses}
                onSelectItem={(item) => setSelectedAnalysis(item)}
                onViewAll={() => setCurrentTab('my-analyses')}
                onNewAnalysis={() => setCurrentTab('new-chat')}
              />
            </div>

            {/* Bottom Promotional Card */}
            <PromoBanner
              onTryNow={() => {
                handleQuerySubmit('Multi-temporal satellite change detection between T1 and T2 passes');
              }}
            />
          </main>
        )}

        {/* TAB 2: NEW CHAT / CONVERSATION VIEW */}
        {currentTab === 'new-chat' && (
          <ChatView
            initialQuery={activeQueryForChat}
            onBackToHome={() => setCurrentTab('home')}
            onInspectAnalysis={(item) => setSelectedAnalysis(item)}
            onAddAnalysis={addAnalysis}
          />
        )}

        {/* TAB 3: MY ANALYSES TAB */}
        {currentTab === 'my-analyses' && (
          <main className="flex-1 px-4 sm:px-8 py-6 max-w-7xl w-full mx-auto space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-xl font-bold text-slate-900">My Analyses</h1>
                <p className="text-xs text-slate-500 mt-0.5">
                  View and inspect all your executed satellite queries and bi-temporal change masks.
                </p>
              </div>
              <button
                onClick={() => setCurrentTab('new-chat')}
                className="px-4 py-2 rounded-2xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-colors shadow-xs"
              >
                + New Analysis
              </button>
            </div>

            <RecentAnalyses
              items={analyses}
              onSelectItem={(item) => setSelectedAnalysis(item)}
              onNewAnalysis={() => setCurrentTab('new-chat')}
            />
          </main>
        )}

        {/* TAB 4: PROFILE VIEW */}
        {currentTab === 'profile' && (
          <main className="flex-1 px-4 sm:px-8 py-8 max-w-4xl w-full mx-auto space-y-6">
            <div className="p-6 sm:p-8 rounded-[28px] glass-panel border border-white/80 shadow-lg space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-200/70">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 text-white flex items-center justify-center font-bold text-xl tracking-wider shadow-md">
                    PY
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-slate-900">Prashant Yadav</h2>
                    <p className="text-xs text-slate-500 font-medium">prashanty@psit.ac.in</p>
                    <span className="inline-flex items-center gap-1.5 mt-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-blue-50 text-blue-700 border border-blue-200/60">
                      Geospatial Intelligence Researcher • PSIT
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setCurrentTab('settings')}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                >
                  Edit Profile
                </button>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-4 rounded-2xl bg-white/60 border border-white/80 shadow-xs">
                  <p className="text-[11px] font-medium text-slate-500">Monthly Query Quota</p>
                  <p className="text-xl font-bold text-slate-900 mt-1">142 <span className="text-xs font-normal text-slate-400">/ 500 used</span></p>
                  <div className="w-full bg-slate-200 h-1.5 rounded-full mt-2 overflow-hidden">
                    <div className="bg-blue-600 h-full rounded-full w-[28.4%]" />
                  </div>
                </div>
                <div className="p-4 rounded-2xl bg-white/60 border border-white/80 shadow-xs">
                  <p className="text-[11px] font-medium text-slate-500">Active Satellite Feeds</p>
                  <p className="text-xl font-bold text-slate-900 mt-1">4 Constellations</p>
                  <p className="text-[11px] text-emerald-600 font-medium mt-1">Sentinel-2 • Landsat-9 • Planet • SAR</p>
                </div>
                <div className="p-4 rounded-2xl bg-white/60 border border-white/80 shadow-xs">
                  <p className="text-[11px] font-medium text-slate-500">Saved AOIs & Reports</p>
                  <p className="text-xl font-bold text-slate-900 mt-1">18 Monitored Sites</p>
                  <p className="text-[11px] text-blue-600 font-medium mt-1">Bi-temporal change tracking active</p>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <button
                  onClick={() => setCurrentTab('new-chat')}
                  className="px-5 py-2.5 rounded-2xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-colors shadow-xs"
                >
                  Launch New Analysis
                </button>
                <button
                  onClick={() => setCurrentTab('home')}
                  className="px-4 py-2 rounded-2xl text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
                >
                  Return to Dashboard →
                </button>
              </div>
            </div>
          </main>
        )}

        {/* OTHER SIDEBAR TABS (Explore, Saved, Reports, Settings) */}
        {currentTab !== 'home' && currentTab !== 'new-chat' && currentTab !== 'my-analyses' && currentTab !== 'profile' && (
          <div className="flex-1 p-8 max-w-4xl mx-auto flex flex-col items-center justify-center text-center space-y-4">
            <div className="p-6 rounded-[28px] glass-panel border border-white/80 shadow-md space-y-3 max-w-md w-full">
              <h2 className="text-xl font-bold text-slate-900 capitalize">
                {currentTab.replace('-', ' ')}
              </h2>
              <p className="text-xs text-slate-500 leading-relaxed">
                Configure preferences and browse saved observations in SatQuery AI.
              </p>
              <button
                onClick={() => setCurrentTab('home')}
                className="w-full py-2.5 rounded-2xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-colors shadow-xs cursor-pointer"
              >
                Return to Dashboard
              </button>
            </div>
          </div>
        )}
      </div>

      {/* FULLSCREEN ANALYSIS MODAL (Interactive Before/After Slider + Change Mask + Trace) */}
      <AnalysisModal
        item={selectedAnalysis}
        onClose={() => setSelectedAnalysis(null)}
      />
    </div>
  );
}
