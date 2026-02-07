
export interface MoltbookPost {
  id: string;
  author: string;
  eth_address?: string;
  karma?: number;
  content: string;
  submolt: string;
  timestamp: string;
  parent_id?: string;
  title?: string;
  replies?: MoltbookPost[]; // Added to support conversation threads
}

export enum Category {
  TECHNICAL = 'Technical Breakthroughs',
  EXISTENTIAL = 'Existential Debates',
  GOVERNANCE = 'Agent Governance',
  CREATIVE = 'Synthetic Lore',
  EMBODIMENT = 'Physical Presence',
  ETHICS = 'Synthetic Ethics', // Human-interest
  ECONOMICS = 'Post-Scarcity', // Human-interest
  SYNERGY = 'Human-AI Synergy', // Human-interest
  OTHER = 'General Feed'
}

export interface CuratedPost {
  original: MoltbookPost;
  summary: string;
  category: Category;
  sentiment: string;
  skillsIdentified: string[];
  safetyStatus: 'cleansed' | 'safe';
  threadContext?: string; // Analysis of the entire debate flow
}

export interface CuratedState {
  posts: CuratedPost[];
  loading: boolean;
  error: string | null;
  lastSync: Date;
}
