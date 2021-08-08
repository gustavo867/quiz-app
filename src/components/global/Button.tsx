import React from "react";
import {
  ActivityIndicator,
  Dimensions,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";
import { moderateScale } from "react-native-size-matters";

interface Props extends TouchableOpacityProps {
  text: string;
  small?: boolean;
  isLoading?: boolean;
}

const { width, height } = Dimensions.get("screen");

const Button: React.FC<Props> = ({
  text,
  small = false,
  isLoading = false,
  ...rest
}) => {
  return (
    <TouchableOpacity
      style={{
        alignItems: "center",
        justifyContent: "center",
        marginTop: moderateScale(5),
        alignSelf: "center",
        width: small ? width * 0.4 : width * 0.85,
        height: moderateScale(50),
        borderRadius: moderateScale(8),
        backgroundColor: "#256EFF",
      }}
      {...rest}
    >
      {isLoading ? (
        <ActivityIndicator color="#fff" size="small" />
      ) : (
        <Text
          style={{
            color: "#fff",
            fontSize: moderateScale(14),
          }}
        >
          {text}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default Button;
