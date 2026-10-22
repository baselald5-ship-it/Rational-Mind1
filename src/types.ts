export type TherapistPersona = 'MAUDY' | 'BENEDICT';

export interface ParsedTherapySections {
  validation: string;
  rational: string;
  grounding: string;
  actionPlan: string;
  actionItems: Array<{ id: string; text: string; done: boolean }>;
  biasesDetected: string[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: string;
  persona?: TherapistPersona;
  parsed?: ParsedTherapySections;
  isStreaming?: boolean;
}

export interface CBTJournalEntry {
  id: string;
  createdAt: string;
  triggerThought: string;
  selectedDistortions: string[];
  objectiveEvidence: string;
  rationalReframing: string;
  actionSteps: string;
  anxietyBefore: number; // 1 - 10
  anxietyAfter: number; // 1 - 10
}

export interface DebunkArticle {
  id: string;
  title: string;
  subtitle: string;
  category: 'Psikologi Kognitif' | 'Astronomi' | 'Riset Ilmiah' | 'Kesehatan Mental';
  readTime: string;
  scientificConcept: string;
  experiment: string;
  takeaway: string;
  content: string[];
  keyQuote: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  scenario: string;
  options: Array<{
    label: string;
    description: string;
    score: number; // 0 (rational) to 2 (high susceptibility)
  }>;
}
