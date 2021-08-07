import React, { memo } from "react";
import { useMemo } from "react";
import { QuizData } from "../../../@types/quiz";
import { useQuiz } from "../../../context/QuizContext";
import Button from "../../global/Button";
import AnswersList from "../../templates/Quiz/Answers";

import * as S from "./styles";

type Props = {
  item: QuizData;
  index: number;
};

const Item: React.FC<Props> = props => {
  const { handleNextQuestion, selectedAnswer } = useQuiz();

  const questions = useMemo(() => {
    const newArry = props.item.incorrect_answers.map(item => ({
      text: item,
      correct: false,
    }));

    return [{ text: props.item.correct_answer, correct: true }, ...newArry];
  }, []);

  const correctAnswerIndex = useMemo(() => {
    return questions.findIndex(item => item.text === props.item.correct_answer);
  }, []);

  return (
    <S.Container>
      <S.ItemTitle>{props.item.question}</S.ItemTitle>
      <AnswersList data={questions} />
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
