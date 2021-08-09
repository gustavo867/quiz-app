import React, { memo, useMemo } from "react";
import { Dimensions, Modal, Text, View } from "react-native";
import { moderateScale } from "react-native-size-matters";
import { useQuiz } from "../../../context/QuizContext";
import Ionicons from "react-native-vector-icons/Ionicons";
import Button from "../../global/Button";

// import { Container } from './styles';

const { width, height } = Dimensions.get("screen");

const Alert: React.FC = () => {
  const { data, retryQuiz, quitQuiz } = useQuiz();

  const hasFinishedTheQuiz = useMemo(() => {
    return data[data.length - 1].finished;
  }, [data]);

  const percentageCorrect = useMemo(() => {
    let newArray = [...data];

    let correctA = 0;
    let incorrectA = 0;

    for (let i = 0; i < newArray.length; i++) {
      if (newArray[i].finished_correct) {
        correctA++;
      } else {
        incorrectA++;
      }
    }

    const got = (correctA / 100) * newArray.length;
    const percentage = got * 100;

    return {
      percentage,
      correctAnswers: correctA,
      incorrectAnswer: incorrectA,
    };
  }, [data]);

  return hasFinishedTheQuiz ? (
    <View
      style={{
        backgroundColor:
          percentageCorrect.percentage < 50 ? "#FF495C" : "#3DDC97",
        height: height * 0.7,
        width: width * 0.9,
        position: "absolute",
        borderRadius: moderateScale(20),
        zIndex: 1000,
        alignSelf: "center",
        padding: moderateScale(20),
      }}
    >
      <View
        style={{
          alignSelf: "center",
        }}
      >
        {percentageCorrect.percentage > 50 ? (
          <Ionicons
            name="happy-outline
          "
            color="#fff"
            size={moderateScale(80)}
          />
        ) : (
          <Ionicons name="sad-outline" color="#fff" size={moderateScale(80)} />
        )}
      </View>
      <Text
        style={{
          fontSize: moderateScale(25),
          color: percentageCorrect.percentage < 50 ? "#fff" : "#000",
          textAlign: "center",
          fontWeight: "bold",
        }}
      >
        {percentageCorrect.percentage}% de acerto
      </Text>
      <Text
        style={{
          fontSize: moderateScale(25),
          color: percentageCorrect.percentage < 50 ? "#fff" : "#000",
          textAlign: "center",
          fontWeight: "bold",
          marginTop: moderateScale(20),
        }}
      >
        You answered correct {percentageCorrect.correctAnswers} of {data.length}{" "}
        questions
      </Text>
      <View
        style={{
          marginTop: moderateScale(20),
        }}
      />
      <Button text="Retry" onPress={() => retryQuiz()} />
      <View
        style={{
          marginTop: moderateScale(10),
        }}
      />
      <Button text="Choose another quiz" onPress={() => quitQuiz()} />
    </View>
  ) : null;
};

export default memo(Alert);
