import React, { memo } from "react";
import { FlatList } from "react-native";
import { QuizData } from "../../../@types/quiz";
import { useQuiz } from "../../../context/QuizContext";
import Button from "../../global/Button";
import Item from "../../organism/Quiz/Item";

// import { Container } from './styles';

type Props = {
  data: QuizData[];
};

const QuizList: React.FC<Props> = ({ data }) => {
  const { scrollRef } = useQuiz();

  return (
    <FlatList
      data={data}
      ref={scrollRef}
      horizontal
      pagingEnabled
      style={{
        flexGrow: 0,
      }}
      scrollEnabled={false}
      showsHorizontalScrollIndicator={false}
      keyExtractor={(_, index) => index.toString()}
      renderItem={({ item, index }) => <Item item={item} index={index} />}
    />
  );
};

export default memo(QuizList);
