import { Dimensions } from "react-native";
import { moderateScale } from "react-native-size-matters";
import styled from "styled-components/native";

const { width, height } = Dimensions.get("screen");

export const Container = styled.View`
  flex: 1;
  align-items: center;
  background-color: #070707;
  justify-content: center;
`;

export const Title = styled.Text`
  color: #fcfcfc;
  font-size: ${moderateScale(20)}px;
  margin-top: ${moderateScale(10)}px;
  margin-bottom: ${moderateScale(10)}px;
`;

export const Row = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Gap = styled.View`
  width: ${moderateScale(10)}px;
`;
