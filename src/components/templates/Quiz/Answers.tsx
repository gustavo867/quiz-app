import React from "react";
import { FlatList, View } from "react-native";
import { moderateScale } from "react-native-size-matters";
import Card from "../../organism/Quiz/Card";

// import { Container } from './styles';

type Question = {
  text: string;
  correct: boolean;
};

type Props = {
  data: Question[];
};

const AnswersList: React.FC<Props> = ({ data }) => {
  return (
    <FlatList
      data={data.sort((a, b) => a.text.length - b.text.length)}
      horizontal
      style={{
        marginTop: moderateScale(15),
        flexGrow: 0,
      }}
      keyExtractor={(_, index) => index.toString()}
      renderItem={({ item, index }) => <Card item={item} index={index} />}
    />
  );
};

export default AnswersList;
