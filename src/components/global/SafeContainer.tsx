import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const SafeContainer: React.FC = ({ children }) => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#070707",
      }}
    >
      {children}
    </SafeAreaView>
  );
};

export { SafeContainer };
