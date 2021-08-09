import React, { memo } from "react";
import { useMemo } from "react";
import { QuizData } from "../../../@types/quiz";
import { useQuiz } from "../../../context/QuizContext";
import Button from "../../global/Button";
import Alert from "../../templates/Quiz/Alert";
import AnswersList from "../../templates/Quiz/Answers";

import * as S from "./styles";

type Props = {
  item: QuizData;
  index: number;
};

const Item: React.FC<Props> = props => {
  const { handleNextQuestion, selectedAnswer, data } = useQuiz();

  const questions = useMemo(() => {
    const newArryIncorrect = props.item.incorrect_answers.map(item => ({
      text: item,
      correct: false,
    }));

    const newArry = [
      ...newArryIncorrect,
      {
        text: props.item.correct_answer,
        correct: true,
      },
    ];

    for (var i = 0; i < newArry.length; i++) {
      const tempAnswer = newArry[i];
      const randomIndex = Math.floor(Math.random() * newArry.length);
      newArry[i] = newArry[randomIndex];
      newArry[randomIndex] = tempAnswer;
    }

    return newArry;
  }, []);

  const correctAnswerIndex = useMemo(() => {
    return questions.findIndex(item => item.text === props.item.correct_answer);
  }, []);

  return (
    <S.Container>
      <S.ItemTitle>{props.item.question}</S.ItemTitle>
      <AnswersList data={questions} />
      {data.length >= 1 && <Alert />}
      <S.CenterBottom>
        <Button
          text="Next"
          onPress={() =>
            handleNextQuestion(selectedAnswer === correctAnswerIndex)
          }
        />
      </S.CenterBottom>
    </S.Container>
  );
};

export default memo(Item);
