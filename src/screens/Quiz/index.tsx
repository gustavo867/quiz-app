import React from "react";
import { ActivityIndicator } from "react-native";
import { moderateScale } from "react-native-size-matters";
import QuizHeader from "../../components/global/QuizHeader";
import QuizList from "../../components/templates/Quiz/QuizList";

import { useQuiz } from "../../context/QuizContext";

import * as S from "./styles";

const Quiz: React.FC = () => {
  const { quizData, loading } = useQuiz();

  return (
    <S.Container>
      {loading ? (
        <ActivityIndicator color="#fff" size={moderateScale(100)} />
      ) : (
        <S.Container>
          <QuizHeader />
          <QuizList data={quizData} />
        </S.Container>
      )}
    </S.Container>
  );
};

export default Quiz;
