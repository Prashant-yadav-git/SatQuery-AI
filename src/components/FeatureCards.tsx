import React from 'react';
import { UploadCloud, MessageSquare, BarChart2, Layers, ArrowRight } from 'lucide-react';

interface FeatureCardsProps {
  onCardClick?: (id: string) => void;
}

export const FeatureCards: React.FC<FeatureCardsProps> = ({ onCardClick }) => {
  const features = [
    {
      id: 'upload',
      title: 'Upload Images',
      subtitle: 'Optical, SAR or multi-temporal',
      icon: UploadCloud,
    },
    {
      id: 'ask',
      title: 'Ask in Natural Language',
      subtitle: 'Get instant, accurate insights',
      icon: MessageSquare,
    },
    {
      id: 'multitask',
      title: 'Multi-Task Analysis',
      subtitle: 'Land cover, change, objects & more',
      icon: BarChart2,
    },
    {
      id: 'evidence',
      title: 'Evidence-Based Answers',
      subtitle: 'With visual and spatial outputs',
      icon: Layers,
    },
  ];

  return (
    <section className="px-1 sm:px-4 py-2 sm:py-3 select-none">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3.5">
        {features.map((f) => {
          const Icon = f.icon;
          return (
            <div
              key={f.id}
              onClick={() => onCardClick?.(f.id)}
              className="group p-3 sm:p-4 rounded-[18px] sm:rounded-[22px] glass-panel border border-white/80 shadow-xs hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 cursor-pointer flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-2 sm:mb-3">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-white/80 border border-slate-200/80 flex items-center justify-center text-slate-700 shadow-2xs group-hover:text-blue-600 transition-colors">
                  <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>
                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-300 group-hover:text-slate-600 group-hover:translate-x-1 transition-all" />
              </div>

              <div>
                <h3 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                  {f.title}
                </h3>
                <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5 font-normal leading-relaxed line-clamp-2">
                  {f.subtitle}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
