import axios from "axios";
import { QuizRequestData } from "../@types/quiz";
import { URL_API } from "../services/api";

// ! https://opentdb.com/api.php?amount=10&category=10&difficulty=easy&type=multiple&encode=base64

export async function fetchQuiz(data: QuizRequestData) {
  const res = await axios.get(
    `${URL_API}category=${data.category}&difficulty=${data.difficulty}&type=${data.type}&encode=base64`,
  );

  return {
    data: res.data.results,
    res: res,
  };
}

export async function fetchCategories() {
  const res = await axios.get(`https://opentdb.com/api_category.php`);

  return {
    data: res.data.trivia_categories,
    res: res,
  };
}
