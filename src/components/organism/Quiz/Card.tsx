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
    <S.CardContainer onPress={() => setSelectedAnswer(props.index)}>
      <S.CardTitle>{props.item.text}</S.CardTitle>
      <S.CardIcon
        style={{
          backgroundColor:
            selectedAnswer === props.index ? "#13131A" : "transparent",
        }}>
        {selectedAnswer === props.index && (
          <>
            {props.item.correct ? (
              <Icon name="done" size={moderateScale(20)} color="green" />
            ) : (
              <Feather name="x" size={moderateScale(20)} color="red" />
            )}
          </>
        )}
      </S.CardIcon>
    </S.CardContainer>
  );
};

export default memo(Card);
