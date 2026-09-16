import React, { useState } from 'react';
import {
  X,
  Layers,
  Sliders,
  Download,
  CheckCircle2,
  Cpu,
  BarChart2,
  Clock,
  Sparkles,
  Calendar,
} from 'lucide-react';
import { AnalysisItem } from '../types';

interface AnalysisModalProps {
  item: AnalysisItem | null;
  onClose: () => void;
}

export const AnalysisModal: React.FC<AnalysisModalProps> = ({ item, onClose }) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [showMaskOverlay, setShowMaskOverlay] = useState(true);
  const [activeTab, setActiveTab] = useState<'evidence' | 'trace' | 'metrics'>('evidence');

  if (!item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-slate-950/60 backdrop-blur-md animate-in fade-in duration-200 select-none">
      <div className="relative w-full max-w-5xl max-h-[95vh] sm:max-h-[92vh] flex flex-col glass-panel rounded-[22px] sm:rounded-[28px] overflow-hidden border border-white/80 shadow-2xl bg-white/95">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-3.5 sm:px-6 py-3 sm:py-4 border-b border-slate-200/70 bg-white/70 gap-2">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <span className="px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-[11px] font-bold bg-slate-900 text-white shadow-xs shrink-0">
              {item.category}
            </span>
            <div className="min-w-0">
              <h2 className="text-sm sm:text-lg font-bold text-slate-900 leading-tight truncate">
                {item.title}
              </h2>
              <div className="flex items-center gap-2 sm:gap-3 text-[11px] sm:text-xs text-slate-500 mt-0.5 truncate">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-slate-400" />
                  {item.date}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Cpu className="w-3 h-3 text-blue-600" />
                  {item.model}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <button
              onClick={() => alert(`Report for "${item.title}" exported as GeoTIFF mask and PDF.`)}
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors shadow-xs cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Export GeoTIFF</span>
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors cursor-pointer shrink-0"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Tabs */}
        <div className="px-3 sm:px-6 pt-2 sm:pt-3 flex items-center gap-1 sm:gap-2 border-b border-slate-100 bg-white/40 overflow-x-auto scrollbar-none">
          <button
            onClick={() => setActiveTab('evidence')}
            className={`pb-2 sm:pb-2.5 px-2.5 sm:px-3 text-[11px] sm:text-xs font-semibold flex items-center gap-1.5 sm:gap-2 border-b-2 transition-all whitespace-nowrap cursor-pointer shrink-0 ${
              activeTab === 'evidence'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Interactive Evidence</span>
          </button>

          <button
            onClick={() => setActiveTab('trace')}
            className={`pb-2 sm:pb-2.5 px-2.5 sm:px-3 text-[11px] sm:text-xs font-semibold flex items-center gap-1.5 sm:gap-2 border-b-2 transition-all whitespace-nowrap cursor-pointer shrink-0 ${
              activeTab === 'trace'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>Execution Trace</span>
          </button>

          <button
            onClick={() => setActiveTab('metrics')}
            className={`pb-2 sm:pb-2.5 px-2.5 sm:px-3 text-[11px] sm:text-xs font-semibold flex items-center gap-1.5 sm:gap-2 border-b-2 transition-all whitespace-nowrap cursor-pointer shrink-0 ${
              activeTab === 'metrics'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <BarChart2 className="w-3.5 h-3.5" />
            <span>Benchmark Metrics</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-3.5 sm:p-6 overflow-y-auto space-y-3.5 sm:space-y-4">
          {activeTab === 'evidence' && (
            <div className="space-y-4">
              <div className="p-3.5 rounded-2xl bg-blue-50/80 border border-blue-100/90 text-slate-800 text-xs sm:text-sm">
                <div className="flex items-center gap-2 font-bold text-blue-900 mb-1">
                  <Sparkles className="w-4 h-4 text-blue-600" />
                  <span>Prompt: &ldquo;{item.query}&rdquo;</span>
                </div>
                <p className="text-slate-700 leading-relaxed">
                  {item.summary}
                </p>
              </div>

              {/* Interactive Split Slider */}
              <div className="relative rounded-2xl overflow-hidden aspect-[16/9] sm:aspect-[21/9] bg-slate-950 border border-slate-200 select-none shadow-inner">
                <img
                  src={item.t1Image}
                  alt="T1 Baseline"
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 w-full h-full object-cover"
                />

                <div
                  className="absolute inset-y-0 left-0 overflow-hidden border-r-2 border-white shadow-[0_0_15px_rgba(0,0,0,0.6)]"
                  style={{ width: `${sliderPosition}%` }}
                >
                  <img
                    src={item.t2Image}
                    alt="T2 Recent"
                    referrerPolicy="no-referrer"
                    className="absolute inset-0 w-full h-full object-cover max-w-none"
                    style={{ width: '100%' }}
                  />

                  {showMaskOverlay && (
                    <div
                      className="absolute inset-0 pointer-events-none mix-blend-color-dodge opacity-80"
                      style={{ background: item.changeMask }}
                    />
                  )}

                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md text-[10px] font-bold bg-slate-900/80 text-white backdrop-blur-md border border-white/20">
                    T2 (Recent Pass)
                  </span>
                </div>

                <span className="absolute top-3 right-3 px-2.5 py-1 rounded-md text-[10px] font-bold bg-slate-900/80 text-white backdrop-blur-md border border-white/20">
                  T1 (Baseline Reference)
                </span>

                <div
                  className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white text-slate-900 shadow-xl flex items-center justify-center cursor-ew-resize border border-slate-300 pointer-events-none"
                  style={{ left: `${sliderPosition}%` }}
                >
                  <Sliders className="w-4 h-4 rotate-90 text-slate-800" />
                </div>

                <input
                  type="range"
                  min="0"
                  max="100"
                  value={sliderPosition}
                  onChange={(e) => setSliderPosition(Number(e.target.value))}
                  className="absolute inset-0 opacity-0 cursor-ew-resize w-full h-full z-20"
                />
              </div>

              {/* Controls */}
              <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-2xl bg-white border border-slate-200/80 text-xs font-semibold">
                <label className="flex items-center gap-2 text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showMaskOverlay}
                    onChange={(e) => setShowMaskOverlay(e.target.checked)}
                    className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  />
                  <Layers className="w-4 h-4 text-blue-600" />
                  <span>Highlight Change Prediction Overlay</span>
                </label>

                <div className="flex items-center gap-4 text-slate-600">
                  <span>
                    Changed Area:{' '}
                    <strong className="text-slate-900">
                      {item.metrics.changedAreaKm2} km² ({item.metrics.changedAreaPct}%)
                    </strong>
                  </span>
                  <span>•</span>
                  <span>
                    IoU Score:{' '}
                    <strong className="text-emerald-600">{item.metrics.iou}%</strong>
                  </span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'trace' && (
            <div className="p-4 rounded-2xl bg-slate-900 text-white font-mono text-xs space-y-3 shadow-inner">
              <div className="flex items-center justify-between text-slate-400 border-b border-slate-800 pb-2">
                <span>[Observable Execution Trace — SIH-26167 Engine]</span>
                <span className="text-emerald-400">STATUS: COMPLETED</span>
              </div>
              <div className="space-y-2">
                {item.trace.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-2.5">
                    <span className="text-slate-500 select-none">0{idx + 1}.</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                    <span className="text-slate-200">{step}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'metrics' && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
              <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                  Precision
                </span>
                <p className="text-2xl font-extrabold text-slate-900 mt-1">
                  {item.metrics.precision}%
                </p>
                <span className="text-[10px] text-slate-400">Target dataset verified</span>
              </div>
              <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                  Recall
                </span>
                <p className="text-2xl font-extrabold text-slate-900 mt-1">
                  {item.metrics.recall}%
                </p>
                <span className="text-[10px] text-slate-400">512x512 tile evaluation</span>
              </div>
              <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                  F1-Score
                </span>
                <p className="text-2xl font-extrabold text-slate-900 mt-1">
                  {item.metrics.f1}%
                </p>
                <span className="text-[10px] text-slate-400">Harmonic mean</span>
              </div>
              <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                  IoU Score
                </span>
                <p className="text-2xl font-extrabold text-blue-600 mt-1">
                  {item.metrics.iou}%
                </p>
                <span className="text-[10px] text-slate-400">Intersection over Union</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
