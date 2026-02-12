
export interface Parish {
  id: string;
  name: string;
  description: string;
  image: string;
  facts: string[];
  location: string;
}

export interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: string;
  parishId: string;
  explanation: string;
}

export interface Level {
  id: number;
  title: string;
  description: string;
  requiredScore: number;
  questions: Question[];
  reward: string;
  icon: string;
}

export type GameState = 'START' | 'LEVEL_SELECT' | 'PLAYING' | 'LEVEL_RESULT';

export interface LevelResult {
  levelId: number;
  score: number;
  total: number;
  stars: number;
  unlockedNext: boolean;
}
