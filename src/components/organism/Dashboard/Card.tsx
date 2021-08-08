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
  const { setCategoryChoosed, categoryChoosed } = useQuiz();

  return (
    <S.CardContainer
      style={{
        elevation: 4,
        borderColor:
          categoryChoosed === props.item.id ? "#256EFF" : "transparent",
        borderWidth: categoryChoosed === props.item.id ? moderateScale(2) : 0,
      }}
      onPress={() => setCategoryChoosed(props.item.id)}
    >
      <S.CardTitle>{props.item.title}</S.CardTitle>
    </S.CardContainer>
  );
};

export default memo(Card);
