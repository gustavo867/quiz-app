import React from "react";
import { StatusBar } from "react-native";
import { QuizContextProvider } from "./context/QuizContext";
import Quiz from "./screens/Quiz";

export default function App() {
  return (
    <>
      <StatusBar
        backgroundColor="transparent"
        translucent
        barStyle="light-content"
      />
      <QuizContextProvider>
        <Quiz />
      </QuizContextProvider>
    </>
  );
}
