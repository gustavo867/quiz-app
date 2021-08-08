import React, { memo } from "react";
import { FlatList } from "react-native";
import { moderateScale } from "react-native-size-matters";
import { difficulties } from "../../../utils/data";
import DifficultyCard from "../../organism/Dashboard/DifficultyCard";

const Difficulties: React.FC = () => {
  return (
    <FlatList
      data={difficulties}
      style={{
        flexGrow: 0,
      }}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        paddingBottom: moderateScale(40),
      }}
      keyExtractor={(_, index) => index.toString()}
      renderItem={({ item, index }) => (
        <DifficultyCard item={item} index={index} />
      )}
    />
  );
};

export default memo(Difficulties);
