import React, { useState, useRef, useEffect } from 'react';
import {
  Sparkles,
  ArrowUp,
  Paperclip,
  X,
  Layers,
  ArrowLeft,
  Sliders,
  Maximize2,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  Cpu,
} from 'lucide-react';
import { ChatMessage, AnalysisItem } from '../types';
import { createAnalysisFromQuery } from '../data/mockData';

interface ChatViewProps {
  initialQuery?: string;
  onBackToHome: () => void;
  onInspectAnalysis: (item: AnalysisItem) => void;
  onAddAnalysis?: (item: AnalysisItem) => void;
}

export const ChatView: React.FC<ChatViewProps> = ({
  initialQuery = '',
  onBackToHome,
  onInspectAnalysis,
  onAddAnalysis,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    if (initialQuery) {
      const initAnalysis = createAnalysisFromQuery(initialQuery);
      return [
        {
          id: '1',
          role: 'user',
          content: initialQuery,
          timestamp: 'Just now',
        },
        {
          id: '2',
          role: 'assistant',
          content: `Processed your query for "${initialQuery}" through the **${initAnalysis.model}** pipeline.\n\n- **Category**: ${initAnalysis.category}\n- **Changed Area**: +${initAnalysis.metrics.changedAreaKm2} km² (${initAnalysis.metrics.changedAreaPct}%)\n- **IoU Overlap**: ${initAnalysis.metrics.iou}%\n\nInspect the interactive evidence card below for bi-temporal visual verification.`,
          timestamp: 'Just now',
          analysis: initAnalysis,
        },
      ];
    }
    return [
      {
        id: 'welcome',
        role: 'assistant',
        content:
          'Welcome to **SatQuery AI Conversational Mode**. Ask any question about Earth observation, request change detection, or attach multi-temporal imagery ($T_1$ & $T_2$).',
        timestamp: 'Just now',
      },
    ];
  });

  const [input, setInput] = useState('');
  const [t1File, setT1File] = useState<File | null>(null);
  const [t2File, setT2File] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    const hasAttachments = t1File !== null || t2File !== null;
    if ((!input.trim() && !hasAttachments) || isLoading) return;

    let attachSummary = '';
    if (t1File && t2File) {
      attachSummary = `[Attached Bi-temporal Pair: T₁=${t1File.name}, T₂=${t2File.name}]`;
    } else if (t1File) {
      attachSummary = `[Attached: ${t1File.name}]`;
    } else if (t2File) {
      attachSummary = `[Attached: ${t2File.name}]`;
    }

    const userText = input.trim() || 'Analyze bi-temporal changes between uploaded satellite images';
    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      role: 'user',
      content: attachSummary ? `${attachSummary}\n${userText}` : userText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');

    // Generate local Object URLs if user uploaded files
    const t1Url = t1File ? URL.createObjectURL(t1File) : undefined;
    const t2Url = t2File ? URL.createObjectURL(t2File) : undefined;

    setT1File(null);
    setT2File(null);

    setIsLoading(true);

    setTimeout(() => {
      const newAnalysis = createAnalysisFromQuery(userText, { t1Url, t2Url });
      if (onAddAnalysis) {
        onAddAnalysis(newAnalysis);
      }

      const assistantMsg: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        role: 'assistant',
        content: `Analyzed bi-temporal satellite pair for "${userText}".\n\n- **Detected Change Area**: +${newAnalysis.metrics.changedAreaKm2} km² (${newAnalysis.metrics.changedAreaPct}% of target AOI)\n- **IoU Confidence**: ${newAnalysis.metrics.iou}%\n- **Model Pipeline**: ${newAnalysis.model}\n\nInspect the interactive evidence card below with sketched contours and bi-temporal comparison.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        analysis: newAnalysis,
      };

      setMessages((prev) => [...prev, assistantMsg]);
      setIsLoading(false);
    }, 600);
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-slate-900/5 select-none relative">
      {/* Chat Top bar */}
      <div className="px-3 sm:px-6 py-2.5 sm:py-3 border-b border-slate-200/70 bg-white/70 backdrop-blur-md flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <button
            onClick={onBackToHome}
            className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors shadow-2xs shrink-0 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Back to Dashboard</span>
            <span className="sm:hidden">Back</span>
          </button>
          <div className="h-4 w-px bg-slate-200 shrink-0" />
          <div className="flex items-center gap-2 min-w-0">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
            <span className="text-xs font-bold text-slate-900 truncate">SatQuery AI Chat</span>
          </div>
        </div>

        <button
          onClick={() => {
            setMessages([
              {
                id: `reset-${Date.now()}`,
                role: 'assistant',
                content: 'Chat cleared. How can I help you analyze the Earth today?',
                timestamp: 'Just now',
              },
            ]);
          }}
          className="text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors shrink-0 cursor-pointer"
        >
          Clear chat
        </button>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto px-2.5 sm:px-8 py-4 sm:py-6 space-y-4 sm:space-y-5">
        <div className="max-w-3xl mx-auto space-y-4 sm:space-y-5">
          {messages.map((msg) => {
            const isUser = msg.role === 'user';
            return (
              <div
                key={msg.id}
                className={`flex gap-3.5 ${isUser ? 'justify-end' : 'justify-start'}`}
              >
                {!isUser && (
                  <div className="w-8 h-8 rounded-xl bg-slate-900 text-white flex items-center justify-center shrink-0 shadow-xs border border-white/20">
                    <Sparkles className="w-4 h-4 text-blue-400" />
                  </div>
                )}

                <div
                  className={`max-w-[85%] rounded-[22px] p-4 shadow-xs text-xs sm:text-sm leading-relaxed space-y-3 ${
                    isUser
                      ? 'bg-slate-900 text-white'
                      : 'bg-white/90 border border-slate-200/80 text-slate-800'
                  }`}
                >
                  <div className="whitespace-pre-line">{msg.content}</div>

                  {/* Inline Evidence Card for Assistant */}
                  {!isUser && msg.analysis && (
                    <div className="mt-3 p-3 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2.5">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-900">
                          {msg.analysis.title}
                        </span>
                        <button
                          onClick={() => onInspectAnalysis(msg.analysis!)}
                          className="flex items-center gap-1 text-[11px] font-bold text-blue-600 hover:underline cursor-pointer"
                        >
                          <Maximize2 className="w-3 h-3" />
                          <span>Inspect Fullscreen</span>
                        </button>
                      </div>

                      <div className="relative aspect-[16/9] rounded-xl overflow-hidden bg-slate-900">
                        <img
                          src={msg.analysis.thumbnail}
                          alt="Thumbnail"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/75 text-white text-[10px] font-bold backdrop-blur-xs">
                          Changed: +{msg.analysis.metrics.changedAreaKm2} km² (IoU: {msg.analysis.metrics.iou}%)
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {isUser && (
                  <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-xs">
                    PY
                  </div>
                )}
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Bar */}
      <div className="p-4 bg-white/60 backdrop-blur-md border-t border-slate-200/70">
        <div className="max-w-3xl mx-auto space-y-2">
          {/* Attached Files Chips */}
          {(t1File || t2File) && (
            <div className="flex flex-wrap items-center gap-2">
              {t1File && (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-semibold text-blue-700 shadow-2xs">
                  <span className="font-bold text-[10px] uppercase tracking-wider bg-blue-200/70 text-blue-900 px-1.5 py-0.2 rounded">T₁ Before</span>
                  <span className="max-w-[150px] truncate">{t1File.name}</span>
                  <button onClick={() => setT1File(null)} className="cursor-pointer">
                    <X className="w-3.5 h-3.5 text-blue-500 hover:text-blue-800" />
                  </button>
                </div>
              )}
              {t2File && (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-700 shadow-2xs">
                  <span className="font-bold text-[10px] uppercase tracking-wider bg-emerald-200/70 text-emerald-900 px-1.5 py-0.2 rounded">T₂ After</span>
                  <span className="max-w-[150px] truncate">{t2File.name}</span>
                  <button onClick={() => setT2File(null)} className="cursor-pointer">
                    <X className="w-3.5 h-3.5 text-emerald-500 hover:text-emerald-800" />
                  </button>
                </div>
              )}
              {!t2File && t1File && (
                <label
                  htmlFor="chat-image-upload-t2"
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full border border-dashed border-slate-300 text-slate-600 hover:border-slate-500 hover:text-slate-800 text-[11px] font-medium cursor-pointer transition-colors"
                >
                  <Paperclip className="w-3 h-3" />
                  <span>+ Add T₂ (After) Image</span>
                </label>
              )}
            </div>
          )}

          <div className="flex items-center gap-2 p-2 rounded-2xl bg-white border border-slate-200/90 shadow-sm focus-within:border-blue-500">
            {/* Hidden Multi-file Input */}
            <input
              type="file"
              id="chat-image-upload"
              accept="image/*,.tif,.tiff"
              multiple
              className="hidden"
              onChange={(e) => {
                const files = e.target.files;
                if (files && files.length > 0) {
                  if (files.length >= 2) {
                    setT1File(files[0]);
                    setT2File(files[1]);
                  } else {
                    if (!t1File) {
                      setT1File(files[0]);
                    } else {
                      setT2File(files[0]);
                    }
                  }
                }
              }}
            />
            <input
              type="file"
              id="chat-image-upload-t2"
              accept="image/*,.tif,.tiff"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setT2File(file);
                }
              }}
            />
            <label
              htmlFor="chat-image-upload"
              className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer flex items-center gap-1"
              title="Attach satellite images (select 1 or 2 files for bi-temporal change detection)"
            >
              <Paperclip className="w-4 h-4" />
            </label>

            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSend();
              }}
              placeholder="Ask questions, or attach T₁ and T₂ satellite images to detect changes..."
              className="flex-1 bg-transparent text-xs sm:text-sm text-slate-800 outline-none placeholder:text-slate-400"
            />

            <button
              onClick={handleSend}
              disabled={(!input.trim() && !t1File && !t2File) || isLoading}
              className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                isLoading
                  ? 'bg-slate-200 text-slate-400 cursor-wait'
                  : input.trim() || t1File || t2File
                  ? 'bg-slate-900 text-white shadow-md active:scale-95 cursor-pointer'
                  : 'bg-slate-100 text-slate-400 cursor-not-allowed'
              }`}
            >
              <ArrowUp className={`w-4 h-4 ${isLoading ? 'animate-bounce' : ''}`} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
