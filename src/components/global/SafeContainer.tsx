import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const SafeContainer: React.FC = ({ children }) => {
  return <SafeAreaView>{children}</SafeAreaView>;
};

export { SafeContainer };
