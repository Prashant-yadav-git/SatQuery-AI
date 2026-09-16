import React, { useState } from 'react';
import { Sparkles, Paperclip, MapPin, ArrowUp } from 'lucide-react';
import { SUGGESTIONS } from '../data/mockData';

interface QueryInputCardProps {
  onSubmitQuery: (query: string) => void;
  onAttachImage?: () => void;
}

export const QueryInputCard: React.FC<QueryInputCardProps> = ({
  onSubmitQuery,
  onAttachImage,
}) => {
  const [query, setQuery] = useState('');

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && query.trim()) {
      onSubmitQuery(query);
    }
  };

  return (
    <section className="px-2 sm:px-4 py-2 select-none">
      {/* Frosted Glass Input Container */}
      <div className="relative rounded-[26px] glass-panel border border-white/90 p-3 sm:p-4 shadow-xl transition-all hover:shadow-2xl">
        <div className="flex items-center gap-3">
          {/* Sparkle Icon */}
          <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100/60 shadow-xs">
            <Sparkles className="w-5 h-5" />
          </div>

          {/* Input text */}
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask anything about the Earth..."
            className="flex-1 bg-transparent text-sm sm:text-base text-slate-800 placeholder:text-slate-400 font-normal outline-none min-w-0"
          />

          {/* Action Icons */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Paperclip */}
            <button
              onClick={onAttachImage}
              type="button"
              className="w-9 h-9 rounded-xl hover:bg-slate-100/80 text-slate-400 hover:text-slate-700 flex items-center justify-center transition-colors"
              title="Attach satellite image"
            >
              <Paperclip className="w-4 h-4" />
            </button>

            {/* Map Pin AOI */}
            <button
              type="button"
              onClick={() => alert('Area of Interest (AOI) bounding box tool ready. Click anywhere on the map to define polygon coordinates.')}
              className="w-9 h-9 rounded-xl hover:bg-slate-100/80 text-slate-400 hover:text-slate-700 flex items-center justify-center transition-colors"
              title="Select Area of Interest (AOI)"
            >
              <MapPin className="w-4 h-4" />
            </button>

            {/* Send Button */}
            <button
              type="button"
              onClick={() => {
                if (query.trim()) onSubmitQuery(query);
              }}
              className="w-10 h-10 rounded-full bg-slate-900 hover:bg-slate-800 text-white flex items-center justify-center transition-all shadow-md active:scale-95 cursor-pointer"
              title="Run Query"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Suggestion Chips */}
        <div className="flex flex-wrap items-center gap-2 pt-3 mt-2 border-t border-slate-200/50">
          {SUGGESTIONS.map((sugg, idx) => (
            <button
              key={idx}
              onClick={() => {
                setQuery(sugg);
                onSubmitQuery(sugg);
              }}
              className="px-3 py-1.5 rounded-full text-xs font-medium text-slate-600 bg-white/70 hover:bg-white hover:text-slate-900 border border-slate-200/70 transition-all shadow-2xs hover:shadow-xs cursor-pointer"
            >
              {sugg}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
