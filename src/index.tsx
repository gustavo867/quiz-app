import React from "react";
import { StatusBar } from "react-native";
import { QueryClient, QueryClientProvider } from "react-query";
import Routes from "./routes";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      keepPreviousData: true,
      cacheTime: 1000 * 60 * 60 * 24,
      refetchOnReconnect: "always",
    },
  },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <StatusBar
        backgroundColor="transparent"
        translucent
        barStyle="light-content"
      />
      <Routes />
    </QueryClientProvider>
  );
}
