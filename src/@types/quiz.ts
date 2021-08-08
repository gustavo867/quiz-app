export interface QuizData {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

export interface QuizDataFinished {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
  finished_correct: boolean;
  finished: boolean;
}

export interface QuizRequestData {
  category: string;
  difficulty: string;
  type: string;
}
