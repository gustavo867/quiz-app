import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";
import { useCallback } from "react";
import { useContext } from "react";
import { useMemo } from "react";
import { createContext } from "react";
import { Alert, Animated, FlatList, View } from "react-native";
import { QuizData, QuizDataFinished } from "../@types/quiz";
import { BASE_URL } from "../services/api";
import { decode } from "../utils/encrypt";

type Question = {
  text: string;
  correct: boolean;
};

type IContext = {
  quizData: QuizData[];
  currentQuestion: number;
  setCurrentQuestion: React.Dispatch<React.SetStateAction<number>>;
  scrollRef: React.RefObject<FlatList<any>>;
  data: QuizDataFinished[];
  selectedAnswer: number | undefined;
  setSelectedAnswer: React.Dispatch<React.SetStateAction<number | undefined>>;
  setData: React.Dispatch<React.SetStateAction<QuizDataFinished[]>>;
  handleNextQuestion: (isCorrect: boolean) => void;
  progress: Animated.Value;
  loading: boolean;
};

const QuizContext = createContext<IContext>({} as IContext);

const QuizContextProvider: React.FC = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [quizData, setQuizData] = useState<QuizData[]>([]);
  const [data, setData] = useState<QuizDataFinished[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<number | undefined>(
    undefined,
  );
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const progress = useRef(new Animated.Value(0)).current;
  const scrollRef = useRef<FlatList<any>>(null);

  const handleNextQuestion = useCallback(
    (isCorrect: boolean) => {
      if (selectedAnswer === undefined) {
        Alert.alert("No answer selected");

        return;
      }

      scrollRef.current?.scrollToIndex({
        index:
          currentQuestion + 1 <= quizData.length - 1 ? currentQuestion + 1 : 0,
        animated: true,
      });

      Animated.timing(progress, {
        toValue: currentQuestion + 1,
        duration: 1000,
        useNativeDriver: false,
      }).start();

      setData(state =>
        state.map((q, i) =>
          i === currentQuestion
            ? {
                ...q,
                finished: true,
                finished_correct: isCorrect,
              }
            : q,
        ),
      );
      setSelectedAnswer(undefined);
      setCurrentQuestion(state =>
        state + 1 <= quizData.length - 1 ? state + 1 : 0,
      );
    },
    [selectedAnswer, currentQuestion, quizData],
  );

  useEffect(() => {
    async function fetchQuiz() {
      const res = await axios.get(BASE_URL);

      setQuizData(
        res.data.results.map((q: any) => ({
          ...q,
          category: decode(q.category),
          type: decode(q.type),
          question: decode(q.question),
          correct_answer: decode(q.correct_answer),
          incorrect_answers: q.incorrect_answers.map((item: any) =>
            decode(item),
          ),
        })),
      );

      setData(
        res.data.results.map((q: any) => ({
          ...q,
          finished_correct: false,
          finished: false,
          category: decode(q.category),
          type: decode(q.type),
          question: decode(q.question),
          correct_answer: decode(q.correct_answer),
          incorrect_answers: q.incorrect_answers.map((item: any) =>
            decode(item),
          ),
        })),
      );

      setLoading(false);
    }

    fetchQuiz();
  }, []);

  const values = useMemo(
    () => ({
      quizData,
      currentQuestion,
      selectedAnswer,
      setSelectedAnswer,
      setCurrentQuestion,
      scrollRef,
      data,
      setData,
      handleNextQuestion,
      progress,
      loading,
    }),
    [
      quizData,
      currentQuestion,
      selectedAnswer,
      setSelectedAnswer,
      setCurrentQuestion,
      scrollRef,
      data,
      setData,
      handleNextQuestion,
      progress,
      loading,
    ],
  );

  return <QuizContext.Provider value={values}>{children}</QuizContext.Provider>;
};

function useQuiz() {
  const context = useContext(QuizContext);

  return context;
}

export { QuizContextProvider, QuizContext, useQuiz };
