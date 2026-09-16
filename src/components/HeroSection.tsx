import React from 'react';
import { Globe2, ChevronRight, Sparkles } from 'lucide-react';

interface HeroSectionProps {
  onOpenLiveEarth?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenLiveEarth }) => {
  return (
    <section className="relative pt-4 sm:pt-6 pb-3 sm:pb-4 px-1 sm:px-4 select-none">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 sm:gap-6 relative z-10">
        {/* Left Typography & Value Prop */}
        <div className="max-w-2xl space-y-2.5 sm:space-y-3">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/5 border border-slate-900/10 text-[10px] sm:text-[11px] font-bold text-slate-700 tracking-wider uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse shrink-0" />
            <span className="truncate">Satellite Intelligence for Earth Observation</span>
          </div>

          {/* Heading */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.12]">
            See Earth Differently
            <br />
            with <span className="text-blue-600">AI.</span>
          </h1>

          {/* Subheading */}
          <div className="pt-0.5 sm:pt-1 text-slate-600 text-xs sm:text-base font-normal leading-relaxed">
            <p className="font-semibold text-slate-800">Ask. Analyze. Discover.</p>
            <p className="text-slate-500">From satellite imagery to real-world geospatial insights.</p>
          </div>
        </div>

        {/* Right Atmospheric Visual Element with Live Earth View Card */}
        <div className="relative flex flex-col items-start lg:items-end shrink-0 pt-1 lg:pt-0">
          {/* Handwritten Style Annotation & Curved Arrow */}
          <div className="relative mb-2 sm:mb-3 mr-4 hidden md:flex items-center gap-2">
            <span className="font-['Caveat',cursive] text-lg sm:text-xl text-slate-700 tracking-wide rotate-[-3deg]">
              Turning satellite data into real-world impact
            </span>
            <svg
              className="w-12 h-8 text-slate-400 rotate-[12deg] -translate-y-1"
              fill="none"
              viewBox="0 0 50 30"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                d="M 5,20 Q 25,5 42,18"
                strokeDasharray="2 2"
                strokeLinecap="round"
              />
              <path d="M 36,12 L 44,19 L 38,24" strokeLinecap="round" />
            </svg>
          </div>

          {/* Floating Glass Status Card: Live Earth View */}
          <button
            onClick={onOpenLiveEarth}
            className="group w-full sm:w-auto flex items-center justify-between sm:justify-start gap-3 px-4 py-2.5 rounded-2xl glass-panel border border-white/80 shadow-md hover:shadow-lg transition-all hover:scale-102 cursor-pointer text-left"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center shadow-xs">
              <Globe2 className="w-5 h-5 animate-[spin_40s_linear_infinite]" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-slate-900">
                  Live Earth View
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
              </div>
              <p className="text-[11px] text-slate-500">
                Real-time satellite data
              </p>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-slate-800 group-hover:translate-x-0.5 transition-all ml-1" />
          </button>
        </div>
      </div>
    </section>
  );
};
