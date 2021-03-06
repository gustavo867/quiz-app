import { Dimensions } from "react-native";
import { moderateScale } from "react-native-size-matters";
import styled from "styled-components/native";

const { width, height } = Dimensions.get("screen");

export const Container = styled.View`
  flex: 1;
  background-color: #070707;
`;

export const Title = styled.Text`
  color: #fff;
  font-size: ${moderateScale(20)}px;
`;
