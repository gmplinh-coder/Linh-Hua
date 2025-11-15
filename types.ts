
export enum QuestionType {
  Grammar = 'Grammar & Vocabulary',
  Phonetics = 'Phonetics',
  Reading = 'Reading & General Knowledge',
  Listening = 'Listening',
}

export interface Question {
  id: number;
  type: QuestionType;
  questionText: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  imageUrl?: string;
  audioText?: string;
}

export interface Round {
  id: number;
  title: string;
  questions: Question[];
  highScore: number;
  status: 'unlocked' | 'completed';
}

export interface UserProfile {
  name: string;
  level: number;
  xp: number;
  coins: number;
  badges: string[];
  skillPerformance: {
    'Grammar & Vocabulary': number;
    'Phonetics': number;
    'Reading & General Knowledge': number;
    'Listening': number;
  };
  mistakes: Question[];
}

export interface QuizResult {
  roundId: number;
  score: number;
  xpEarned: number;
  coinsEarned: number;
  incorrectQuestions: Question[];
  answers: { [questionId: number]: string };
}
