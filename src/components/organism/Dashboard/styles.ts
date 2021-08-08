import { Dimensions } from "react-native";
import { moderateScale } from "react-native-size-matters";
import styled from "styled-components/native";

const { width } = Dimensions.get("screen");

export const CardContainer = styled.TouchableOpacity`
  width: ${width * 0.43}px;
  min-height: ${moderateScale(100)}px;
  background-color: #13131a;
  border-radius: ${moderateScale(8)}px;
  padding: ${moderateScale(10)}px;
  margin-top: ${moderateScale(8)}px;
  margin-horizontal: ${moderateScale(8)}px;
  align-items: center;
  justify-content: center;
`;

export const DifficultyCardContainer = styled.TouchableOpacity`
  width: ${width * 0.9}px;
  min-height: ${moderateScale(60)}px;
  background-color: #13131a;
  border-radius: ${moderateScale(8)}px;
  padding: ${moderateScale(10)}px;
  margin-top: ${moderateScale(8)}px;
  align-items: center;
  justify-content: center;
`;

export const CardTitle = styled.Text`
  font-size: ${moderateScale(14)}px;
  color: #fff;
  text-align: center;
`;
