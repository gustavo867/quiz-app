import React from "react";
import {
  Dimensions,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";
import { moderateScale } from "react-native-size-matters";

interface Props extends TouchableOpacityProps {
  text: string;
}

const { width, height } = Dimensions.get("screen");

const Button: React.FC<Props> = ({ text, ...rest }) => {
  return (
    <TouchableOpacity
      style={{
        alignItems: "center",
        justifyContent: "center",
        marginTop: moderateScale(5),
        alignSelf: "center",
        width: width * 0.85,
        height: moderateScale(50),
        borderRadius: moderateScale(8),
        backgroundColor: "#258bdfdd",
      }}
      {...rest}>
      <Text
        style={{
          color: "#fff",
          fontSize: moderateScale(14),
        }}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
