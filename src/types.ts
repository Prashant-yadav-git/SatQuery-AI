export interface AnalysisItem {
  id: string;
  title: string;
  category: 'Coastal' | 'Agriculture' | 'Environment' | 'Urban';
  date: string;
  thumbnail: string;
  t1Image: string;
  t2Image: string;
  changeMask: string;
  query: string;
  model: string;
  metrics: {
    changedAreaKm2: number;
    changedAreaPct: number;
    iou: number;
    precision: number;
    recall: number;
    f1: number;
  };
  summary: string;
  trace: string[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  analysis?: AnalysisItem;
}
