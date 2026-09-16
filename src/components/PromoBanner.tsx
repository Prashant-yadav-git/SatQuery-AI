import React from 'react';
import { ArrowRight, Sparkles, Orbit } from 'lucide-react';

interface PromoBannerProps {
  onTryNow?: () => void;
}

export const PromoBanner: React.FC<PromoBannerProps> = ({ onTryNow }) => {
  return (
    <section className="px-2 sm:px-4 py-3 select-none">
      <div className="relative rounded-[26px] overflow-hidden glass-panel border border-white/90 p-5 sm:p-6 shadow-md hover:shadow-lg transition-all duration-200">
        {/* Background Atmospheric Layer */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/10 via-slate-900/5 to-transparent pointer-events-none" />

        {/* 3D Satellite & Planet Graphic in Background */}
        <div className="absolute right-4 -top-6 w-56 h-56 opacity-25 lg:opacity-45 pointer-events-none flex items-center justify-center">
          <Orbit className="w-48 h-48 text-slate-700 animate-[spin_60s_linear_infinite]" />
        </div>

        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1.5 max-w-xl">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-600 text-white shadow-2xs">
                New
              </span>
              <h3 className="text-sm sm:text-base font-bold text-slate-900">
                Multi-Temporal Analysis
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
              Compare multiple time points to detect changes with higher accuracy.
            </p>
          </div>

          <button
            onClick={onTryNow}
            className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold shadow-md active:scale-95 transition-all self-start sm:self-auto cursor-pointer"
          >
            <span>Try Now</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
};
