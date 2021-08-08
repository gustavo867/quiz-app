import React from "react";
import {
  Animated,
  Dimensions,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { moderateScale } from "react-native-size-matters";
import { useQuiz } from "../../context/QuizContext";
import Icon from "react-native-vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/core";

const { width } = Dimensions.get("screen");

const QuizHeader: React.FC = () => {
  const { goBack } = useNavigation();
  const { progress, data, currentQuestion } = useQuiz();

  const progressAnim = progress.interpolate({
    inputRange: [0, data.length],
    outputRange: [0, width * 0.9],
  });

  return (
    <>
      <TouchableOpacity
        style={{
          marginLeft: moderateScale(15),
          marginTop: moderateScale(8),
        }}
        onPress={() => goBack()}
      >
        <Icon name="arrowleft" size={moderateScale(20)} color="white" />
      </TouchableOpacity>
      <View
        style={{
          width: width * 0.9,
          alignSelf: "center",
          marginTop: moderateScale(5),
          height: moderateScale(20),
          borderRadius: moderateScale(20),
          backgroundColor: "#13131A",
          overflow: "hidden",
          borderColor: "rgba(255, 255, 255, 0.3)",
          borderWidth: moderateScale(1),
        }}
      >
        <Animated.View
          style={{
            width: progressAnim,
            height: moderateScale(20),
            backgroundColor: "#256EFF",
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
        }}
      >
        {currentQuestion + 1}/{data.length}
      </Text>
    </>
  );
};

export default QuizHeader;
