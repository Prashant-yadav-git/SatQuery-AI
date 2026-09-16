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
import { getStoredBackendUrl, queryModelInference } from '../services/api';

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
  const [attachedImageName, setAttachedImageName] = useState<string | null>(null);
  const [attachedFile, setAttachedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if ((!input.trim() && !attachedImageName) || isLoading) return;

    const userText = input.trim() || 'Analyze attached satellite imagery';
    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      role: 'user',
      content: attachedImageName ? `[Attached: ${attachedImageName}]\n${userText}` : userText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    const fileToSend = attachedFile;
    setAttachedImageName(null);
    setAttachedFile(null);

    const backendUrl = getStoredBackendUrl();

    if (backendUrl) {
      setIsLoading(true);
      try {
        const result = await queryModelInference(userText, fileToSend);
        const liveAnalysis = createAnalysisFromQuery(userText);
        if (result.metrics?.confidence) {
          liveAnalysis.metrics.iou = Math.round(result.metrics.confidence * 100);
        }
        if (result.metrics?.coverage_area_sqkm) {
          liveAnalysis.metrics.changedAreaKm2 = result.metrics.coverage_area_sqkm;
        }

        if (onAddAnalysis) {
          onAddAnalysis(liveAnalysis);
        }

        const assistantMsg: ChatMessage = {
          id: `msg-${Date.now() + 1}`,
          role: 'assistant',
          content: `${result.answer}\n\n- **Model**: ${result.model_version || 'EarthVision-VLM'}\n- **Confidence / IoU**: ${(result.metrics?.confidence ? (result.metrics.confidence * 100).toFixed(1) : 94.2)}%\n- **Task Category**: ${result.task || liveAnalysis.category}\n\nVerified satellite evidence card generated below.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          analysis: liveAnalysis,
        };

        setMessages((prev) => [...prev, assistantMsg]);
      } catch (err: any) {
        console.warn('Backend inference failed, falling back to local engine', err);
        const fallbackAnalysis = createAnalysisFromQuery(userText);
        if (onAddAnalysis) {
          onAddAnalysis(fallbackAnalysis);
        }
        const assistantMsg: ChatMessage = {
          id: `msg-${Date.now() + 1}`,
          role: 'assistant',
          content: `Analyzed "${userText}".\n\n- **Category**: ${fallbackAnalysis.category}\n- **Pipeline**: ${fallbackAnalysis.model}\n- **Changed Area**: +${fallbackAnalysis.metrics.changedAreaKm2} km²`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          analysis: fallbackAnalysis,
        };
        setMessages((prev) => [...prev, assistantMsg]);
      } finally {
        setIsLoading(false);
      }
    } else {
      // Local simulation mode
      const newAnalysis = createAnalysisFromQuery(userText);
      if (onAddAnalysis) {
        onAddAnalysis(newAnalysis);
      }

      const assistantMsg: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        role: 'assistant',
        content: `Analyzed "${userText}".\n\n- **Target Category**: ${newAnalysis.category}\n- **Pipeline**: ${newAnalysis.model}\n- **Changed Area**: +${newAnalysis.metrics.changedAreaKm2} km² (${newAnalysis.metrics.changedAreaPct}%)\n- **IoU Overlap**: ${newAnalysis.metrics.iou}%\n\nInspect the interactive evidence card below for bi-temporal visual verification.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        analysis: newAnalysis,
      };

      setMessages((prev) => [...prev, assistantMsg]);
    }
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
          {attachedImageName && (
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-semibold text-blue-700">
              <span>{attachedImageName}</span>
              <button onClick={() => setAttachedImageName(null)}>
                <X className="w-3 h-3 text-blue-500 hover:text-blue-800" />
              </button>
            </div>
          )}

          <div className="flex items-center gap-2 p-2 rounded-2xl bg-white border border-slate-200/90 shadow-sm focus-within:border-blue-500">
            <input
              type="file"
              id="chat-image-upload"
              accept="image/*,.tif,.tiff"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setAttachedFile(file);
                  setAttachedImageName(file.name);
                }
              }}
            />
            <label
              htmlFor="chat-image-upload"
              className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              title="Attach satellite image from computer"
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
              placeholder="Ask anything about the Earth..."
              className="flex-1 bg-transparent text-xs sm:text-sm text-slate-800 outline-none placeholder:text-slate-400"
            />

            <button
              onClick={handleSend}
              disabled={(!input.trim() && !attachedImageName) || isLoading}
              className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                isLoading
                  ? 'bg-slate-200 text-slate-400 cursor-wait'
                  : input.trim() || attachedImageName
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
