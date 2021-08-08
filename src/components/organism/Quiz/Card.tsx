import React, { memo } from "react";
import { useState } from "react";
import { moderateScale } from "react-native-size-matters";
import Icon from "react-native-vector-icons/MaterialIcons";
import Feather from "react-native-vector-icons/Feather";

import * as S from "./styles";
import { useQuiz } from "../../../context/QuizContext";

type Question = {
  text: string;
  correct: boolean;
};

type Props = {
  item: Question;
  index: number;
};

const Card: React.FC<Props> = props => {
  const { selectedAnswer, setSelectedAnswer } = useQuiz();

  return (
    <S.CardContainer
      style={{
        borderColor:
          selectedAnswer === props.index && props.item.correct
            ? "#3DDC97"
            : selectedAnswer === props.index && props.item.correct === false
            ? "#FF495C"
            : props.item.correct
            ? "rgba(61, 220, 151, 0.3)"
            : "transparent",
        borderWidth:
          selectedAnswer === props.index
            ? moderateScale(3)
            : selectedAnswer !== undefined && props.item.correct
            ? moderateScale(3)
            : 0,
      }}
      onPress={() =>
        setSelectedAnswer(state => (state === undefined ? props.index : state))
      }
    >
      <S.CardTitle>{props.item.text}</S.CardTitle>
      <S.CardIcon
        style={{
          backgroundColor:
            selectedAnswer === props.index ? "#070707" : "transparent",
        }}
      >
        {Boolean(
          selectedAnswer === props.index || selectedAnswer !== undefined,
        ) && (
          <>
            {props.item.correct ? (
              <Icon
                name="done"
                size={moderateScale(20)}
                color={
                  selectedAnswer === props.index
                    ? "#3DDC97"
                    : "rgba(61, 220, 151, 0.5)"
                }
              />
            ) : (
              <Feather
                name="x"
                size={moderateScale(20)}
                color={
                  selectedAnswer === props.index
                    ? "#FF495C"
                    : "rgba(	255, 73, 92, 0.5)"
                }
              />
            )}
          </>
        )}
      </S.CardIcon>
    </S.CardContainer>
  );
};

export default memo(Card);
