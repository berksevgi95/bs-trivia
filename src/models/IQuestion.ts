import { EDifficulty } from "./EDifficulty";
import { ECategory } from "./ECategory";

export interface IQuestion {
  difficulty: EDifficulty,
  type: string, //
  category: ECategory,
  correct_answer: string,
  incorrect_answers: string[],
  question: string,
}