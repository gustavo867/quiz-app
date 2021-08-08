import { Dimensions } from "react-native";
import { moderateScale } from "react-native-size-matters";
import styled from "styled-components/native";

const { width, height } = Dimensions.get("screen");

export const Container = styled.View`
  width: ${width}px;
  height: ${height * 0.85}px;
  background-color: #070707;
  flex: 1;
  padding: ${moderateScale(20)}px;
`;

export const ItemTitle = styled.Text`
  font-size: ${moderateScale(20)}px;
  color: #fff;
`;

export const CardContainer = styled.TouchableOpacity`
  width: ${width * 0.9}px;
  min-height: ${moderateScale(60)}px;
  background-color: #13131a;
  border-radius: ${moderateScale(8)}px;
  padding: ${moderateScale(10)}px;
  margin-top: ${moderateScale(8)}px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const CardTitle = styled.Text`
  font-size: ${moderateScale(15)}px;
  width: ${width * 0.7}px;
  color: #fff;
`;

export const CardIcon = styled.TouchableOpacity`
  height: ${moderateScale(30)}px;
  width: ${moderateScale(30)}px;
  align-items: center;
  justify-content: center;
  background-color: #070707;
  border-radius: ${moderateScale(15)}px;
`;

export const CenterBottom = styled.View`
  position: absolute;
  bottom: ${moderateScale(10)}px;
  align-items: center;
  align-self: center;
`;
