import React, { createRef } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  NavigationContainer,
  NavigationContainerRef,
} from "@react-navigation/native";
import Dashboard from "../screens/Dashboard";
import Quiz from "../screens/Quiz";
import { QuizContextProvider } from "../context/QuizContext";
import { SafeContainer } from "../components/global/SafeContainer";

const Stack = createNativeStackNavigator();

const navigatorRef = createRef<NavigationContainerRef<any>>();

export function navigate(page: string, params?: any) {
  navigatorRef.current?.navigate(page, params);
}

const Routes: React.FC = () => {
  return (
    <SafeContainer>
      <QuizContextProvider>
        <NavigationContainer ref={navigatorRef}>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="Dashboard" component={Dashboard} />
            <Stack.Screen name="Quiz" component={Quiz} />
          </Stack.Navigator>
        </NavigationContainer>
      </QuizContextProvider>
    </SafeContainer>
  );
};

export default Routes;
