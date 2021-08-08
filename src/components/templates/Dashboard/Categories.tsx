import React, { memo } from "react";
import { FlatList } from "react-native";
import { moderateScale } from "react-native-size-matters";
import { useQuiz } from "../../../context/QuizContext";
import Card from "../../organism/Dashboard/Card";

const Categories: React.FC = () => {
  const { categories } = useQuiz();

  return (
    <FlatList
      data={categories}
      style={{
        flexGrow: 0,
      }}
      showsVerticalScrollIndicator={false}
      numColumns={2}
      contentContainerStyle={{
        paddingBottom: moderateScale(40),
      }}
      keyExtractor={(_, index) => index.toString()}
      renderItem={({ item, index }) => <Card item={item} index={index} />}
    />
  );
};

export default memo(Categories);
