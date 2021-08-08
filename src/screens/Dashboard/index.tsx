import React from "react";
import Button from "../../components/global/Button";
import Categories from "../../components/templates/Dashboard/Categories";
import Difficulties from "../../components/templates/Dashboard/Difficulties";
import { useQuiz } from "../../context/QuizContext";
import * as S from "./styles";

const Dashboard: React.FC = () => {
  const { categoryChoosed, handleQuiz, setCategoryChoosed, loading } =
    useQuiz();

  return (
    <S.Container>
      <S.Title>
        {categoryChoosed === undefined
          ? "Choose a category"
          : "Choose a difficulty"}
      </S.Title>
      {categoryChoosed === undefined && <Categories />}
      {categoryChoosed !== undefined && <Difficulties />}
      {categoryChoosed !== undefined && (
        <S.Row>
          <Button
            small
            text="Back"
            onPress={() => setCategoryChoosed(undefined)}
            disabled={loading}
          />
          <S.Gap />
          <Button
            small
            text="Go"
            onPress={() => handleQuiz()}
            isLoading={loading}
            disabled={loading}
          />
        </S.Row>
      )}
    </S.Container>
  );
};

export default Dashboard;
