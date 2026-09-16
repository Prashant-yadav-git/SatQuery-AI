import React from 'react';
import { ArrowRight, Calendar, Layers } from 'lucide-react';
import { AnalysisItem } from '../types';

interface RecentAnalysesProps {
  items: AnalysisItem[];
  onSelectItem: (item: AnalysisItem) => void;
  onViewAll?: () => void;
  onNewAnalysis?: () => void;
}

export const RecentAnalyses: React.FC<RecentAnalysesProps> = ({
  items,
  onSelectItem,
  onViewAll,
  onNewAnalysis,
}) => {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Coastal':
        return 'bg-blue-50 text-blue-700 border-blue-200/60';
      case 'Agriculture':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200/60';
      case 'Environment':
        return 'bg-cyan-50 text-cyan-700 border-cyan-200/60';
      case 'Urban':
        return 'bg-purple-50 text-purple-700 border-purple-200/60';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="space-y-3 select-none">
      {/* Header */}
      <div className="flex items-center justify-between px-1">
        <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
          Recent Analyses
        </h2>
        {items.length > 0 && (
          <button
            onClick={onViewAll}
            className="text-xs font-semibold text-slate-500 hover:text-slate-900 flex items-center gap-1 transition-colors group cursor-pointer"
          >
            <span>View all</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        )}
      </div>

      {/* When Empty */}
      {items.length === 0 ? (
        <div className="rounded-[24px] glass-panel border border-white/80 p-8 text-center space-y-3 shadow-xs">
          <div className="w-12 h-12 rounded-2xl bg-slate-100 border border-slate-200 text-slate-500 flex items-center justify-center mx-auto">
            <Layers className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900">No analyses yet</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto leading-relaxed">
              Submit a natural language query or upload bi-temporal satellite tiles above to run real-time change detection.
            </p>
          </div>
          {onNewAnalysis && (
            <button
              onClick={onNewAnalysis}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-colors shadow-xs cursor-pointer"
            >
              <span>Start an Analysis</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      ) : (
        /* Cards Grid */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((item) => (
            <div
              key={item.id}
              onClick={() => onSelectItem(item)}
              className="group rounded-[22px] glass-panel border border-white/80 overflow-hidden shadow-xs hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 cursor-pointer flex flex-col"
            >
              {/* Thumbnail */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-900">
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span
                  className={`absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold border backdrop-blur-md shadow-2xs ${getCategoryColor(
                    item.category
                  )}`}
                >
                  {item.category}
                </span>
              </div>

              {/* Content */}
              <div className="p-3.5 flex flex-col justify-between flex-1">
                <h3 className="text-xs sm:text-sm font-bold text-slate-900 line-clamp-1 group-hover:text-blue-600 transition-colors">
                  {item.title}
                </h3>
                <div className="flex items-center justify-between text-[11px] text-slate-400 mt-2 pt-2 border-t border-slate-100">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-slate-400" />
                    {item.date}
                  </span>
                  <span className="text-[10px] font-semibold text-blue-600 group-hover:underline">
                    Inspect &rarr;
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
