import React, { memo } from "react";
import { moderateScale } from "react-native-size-matters";
import { useQuiz } from "../../../context/QuizContext";
import * as S from "./styles";

type Category = {
  title: string;
  id: string;
};

type Props = {
  item: Category;
  index: number;
};

const Card: React.FC<Props> = props => {
  const { setCurrentDifficulty, currentDifficulty } = useQuiz();

  return (
    <S.DifficultyCardContainer
      style={{
        elevation: 4,
        borderColor:
          currentDifficulty === props.item.id ? "#256EFF" : "transparent",
        borderWidth: currentDifficulty === props.item.id ? moderateScale(2) : 0,
      }}
      onPress={() => setCurrentDifficulty(props.item.id)}
    >
      <S.CardTitle
        style={{
          fontSize: moderateScale(20),
        }}
      >
        {props.item.title}
      </S.CardTitle>
    </S.DifficultyCardContainer>
  );
};

export default memo(Card);
