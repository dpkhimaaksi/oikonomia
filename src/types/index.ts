export type CategoryId = 'akuntansi' | 'mikro' | 'makro';

export interface Category {
  id: CategoryId;
  name: string;
  slug: string;
  description: string;
  badgeLabel: string;
  topicsCount: number;
}

export interface Topic {
  id: string;
  categoryId: CategoryId;
  title: string;
  slug: string;
  order: number;
  summary: string;
}

export interface ArticleSection {
  title: string;
  content: string; // Markdown or rich text representation
}

export interface PracticeQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface Article {
  id: string;
  topicId: string;
  categoryId: CategoryId;
  title: string;
  slug: string;
  difficulty: 'Dasar' | 'Menengah' | 'Lanjutan';
  readTime: string;
  intro: string;
  conceptPoints: {
    heading: string;
    description: string;
  }[];
  formulas: {
    name: string;
    formula: string;
    description: string;
    variables: { symbol: string; meaning: string }[];
  }[];
  caseStudy: {
    title: string;
    context: string;
    solutionSteps: string[];
    takeaway: string;
  };
  visualExplanation?: {
    type: 'table' | 'diagram' | 'formula_comparison';
    title: string;
    headers?: string[];
    rows?: string[][];
    notes?: string;
  };
  quiz: PracticeQuestion[];
}

export interface GlossaryTerm {
  id: string;
  term: string;
  originalTerm?: string;
  category: CategoryId;
  definition: string;
  formula?: string;
  example: string;
  relatedArticleId?: string;
}

export interface QuizQuestionItem {
  id: string;
  categoryId: CategoryId;
  topicTitle: string;
  targetAudience: 'SMA/UTBK' | 'Kuliah S1' | 'Praktisi';
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export type SimulatorType = 
  | 'market-equilibrium'
  | 'macro-multiplier'
  | 'depreciation'
  | 'elasticity'
  | 'trial-balance'
  | 'gdp-inflation';

export interface SimulatorInfo {
  id: string;
  type: SimulatorType;
  categoryId: CategoryId;
  title: string;
  description: string;
  parameters: string[];
  outputMetrics: string[];
}
