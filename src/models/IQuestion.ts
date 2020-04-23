enum EDifficulty {
  EASY = "easy"
}

enum ECategory {
  GENERAL_KNOWLEDGE = "General Knowledge"
}

export interface IQuestion {
  difficulty: EDifficulty,
  type: string, //
  category: ECategory,
  correct_answer: string,
  incorrect_answers: string[],
  question: string,
}