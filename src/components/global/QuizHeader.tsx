import React from "react";
import { Animated, Dimensions, Text, View } from "react-native";
import { moderateScale } from "react-native-size-matters";
import { useQuiz } from "../../context/QuizContext";

const { width } = Dimensions.get("screen");

const QuizHeader: React.FC = () => {
  const { progress, data, currentQuestion } = useQuiz();

  const progressAnim = progress.interpolate({
    inputRange: [0, data.length],
    outputRange: [0, width * 0.9],
  });

  return (
    <>
      <View
        style={{
          width: width * 0.9,
          alignSelf: "center",
          marginTop: moderateScale(20),
          height: moderateScale(20),
          borderRadius: moderateScale(20),
          backgroundColor: "#cccccc63",
        }}>
        <Animated.View
          style={{
            width: progressAnim,
            height: moderateScale(20),
            borderRadius: moderateScale(20),
            backgroundColor: "#258bdfdd",
          }}
        />
      </View>
      <Text
        style={{
          color: "#fff",
          width: width * 0.9,
          alignSelf: "center",
          textAlign: "left",
          marginTop: moderateScale(10),
          fontSize: moderateScale(20),
        }}>
        {currentQuestion + 1}/{data.length}
      </Text>
    </>
  );
};

export default QuizHeader;
