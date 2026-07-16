export type SubjectCategory =
  | 'Physics'
  | 'Chemistry'
  | 'Biology'
  | 'Math'
  | 'Computer Science'
  | 'Astronomy'
  | 'History'
  | 'Philosophy'
  | 'Economics'
  | 'Literature'
  | 'Earth Sciences'
  | 'Engineering';

export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  fullText: string;
  category: SubjectCategory;
  wikiUrl: string;
  estimatedReadTime: number; // in minutes
  keyTakeaways: string[];
  funFact: string;
  quiz?: QuizQuestion;
  isCustom?: boolean; // if imported or fetched dynamically
}

export interface UserInteraction {
  articleId: string;
  category: SubjectCategory;
  viewedAt: number;
  lingerTimeMs: number; // time spent viewing/lingering on the post
  expanded: boolean;
  bookmarked: boolean;
  liked: boolean; // positive feedback
  disliked: boolean; // negative feedback ("Not Interested")
  quizSolved?: boolean;
  quizCorrect?: boolean;
}

export interface SubjectPreferences {
  [key: string]: {
    weight: number; // default is 1.0, changes based on interaction
    pinned: boolean; // if pinned, manual boost
    excluded: boolean; // if excluded, never shown
  };
}

export interface StudyStats {
  totalScrolled: number;
  totalExpanded: number;
  totalLingerTimeMs: number;
  streak: number;
  brainsGained: number; // score/points
  quizzesAttempted: number;
  quizzesCorrect: number;
  categoryCounts: { [key in SubjectCategory]?: number };
}
