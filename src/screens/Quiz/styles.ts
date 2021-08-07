import { Dimensions } from "react-native";
import { moderateScale } from "react-native-size-matters";
import styled from "styled-components/native";

const { width, height } = Dimensions.get("screen");

export const Container = styled.View`
  flex: 1;
  align-items: center;
  background-color: #13131a;
`;

export const Title = styled.Text`
  color: #fff;
  font-size: ${moderateScale(20)}px;
`;
