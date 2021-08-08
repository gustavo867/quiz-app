import { AxiosResponse } from "axios";
import React from "react";
import { useState } from "react";
import { useRef } from "react";
import { useCallback } from "react";
import { useContext } from "react";
import { useMemo } from "react";
import { createContext } from "react";
import { Alert, Animated, FlatList } from "react-native";
import {
  useMutation,
  UseMutationResult,
  useQuery,
  UseQueryResult,
} from "react-query";
import { QuizData, QuizDataFinished, QuizRequestData } from "../@types/quiz";
import { fetchCategories, fetchQuiz } from "../queries/quiz";
import { navigate } from "../routes";
import { decode } from "../utils/encrypt";

type Question = {
  text: string;
  correct: boolean;
};

type Categories = {
  title: string;
  id: string;
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
  quizMutation: UseMutationResult<
    {
      data: any;
      res: AxiosResponse<any>;
    },
    unknown,
    QuizRequestData,
    unknown
  >;
  categoriesQuery: UseQueryResult<
    {
      data: any;
      res: AxiosResponse<any>;
    },
    unknown
  >;
  categories: Categories[];
  categoryChoosed: number | string | undefined;
  setCategoryChoosed: React.Dispatch<
    React.SetStateAction<number | string | undefined>
  >;
  currentDifficulty: string | undefined;
  setCurrentDifficulty: React.Dispatch<
    React.SetStateAction<string | undefined>
  >;
  handleQuiz: () => void;
};

const QuizContext = createContext<IContext>({} as IContext);

const QuizContextProvider: React.FC = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<Categories[]>([]);
  const [categoryChoosed, setCategoryChoosed] = useState<
    number | string | undefined
  >(undefined);
  const [currentDifficulty, setCurrentDifficulty] = useState<
    string | undefined
  >(undefined);
  const [quizData, setQuizData] = useState<QuizData[]>([]);
  const [data, setData] = useState<QuizDataFinished[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<number | undefined>(
    undefined,
  );
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const progress = useRef(new Animated.Value(0)).current;
  const scrollRef = useRef<FlatList<any>>(null);
  const quizMutation = useMutation(
    "quizMutation",
    (data: QuizRequestData) => fetchQuiz(data),
    {
      onSuccess: ({ data }) => {
        setQuizData(
          data.map((q: QuizData) => ({
            ...q,
            category: decode(q.category),
            type: decode(q.type),
            question: decode(q.question),
            correct_answer: decode(q.correct_answer),
            incorrect_answers: q.incorrect_answers.map(item => decode(item)),
          })),
        );
        setData(
          data.map((q: QuizData) => ({
            ...q,
            finished_correct: false,
            finished: false,
            category: decode(q.category),
            type: decode(q.type),
            question: decode(q.question),
            correct_answer: decode(q.correct_answer),
            incorrect_answers: q.incorrect_answers.map(item => decode(item)),
          })),
        );

        setLoading(false);

        navigate("Quiz");
      },
    },
  );
  const categoriesQuery = useQuery("categoriesQuery", () => fetchCategories(), {
    onSuccess: ({ data }) => {
      setCategories(
        data.map((item: any) => ({ title: item.name, id: item.id })),
      );
    },
  });

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

      if (currentQuestion + 1 === data.length) {
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
        setCurrentQuestion(0);
        navigate("Dashboard");

        return;
      }

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

  const handleQuiz = useCallback(() => {
    if (!categoryChoosed === undefined) {
      Alert.alert("Choose a category");

      return;
    }

    if (currentDifficulty === undefined) {
      Alert.alert("Choose a difficulty");

      return;
    }

    setLoading(true);

    quizMutation.mutate({
      category: String(categoryChoosed),
      difficulty: String(currentDifficulty),
      type: "multiple",
    });
  }, [currentDifficulty, categoryChoosed]);

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
      quizMutation,
      categoriesQuery,
      categories,
      categoryChoosed,
      setCategoryChoosed,
      currentDifficulty,
      setCurrentDifficulty,
      handleQuiz,
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
      quizMutation,
      categoriesQuery,
      categories,
      categoryChoosed,
      setCategoryChoosed,
      currentDifficulty,
      setCurrentDifficulty,
      handleQuiz,
    ],
  );

  return <QuizContext.Provider value={values}>{children}</QuizContext.Provider>;
};

function useQuiz() {
  const context = useContext(QuizContext);

  return context;
}

export { QuizContextProvider, QuizContext, useQuiz };
