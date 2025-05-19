import { BttmSheetProvider } from "@/components/bottom-sheet";
import { store } from "@/store/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { StatusBar } from "react-native";
import { Provider } from "react-redux";
import "./global.css";

import "react-native-get-random-values";

export default function RootLayout() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <BttmSheetProvider>
          <StatusBar hidden={true} />
          <Stack>
            <Stack.Screen
              name="index"
              options={{ headerShown: false }}
            ></Stack.Screen>
            <Stack.Screen
              name="create-did"
              options={{ headerShown: false }}
            ></Stack.Screen>
            <Stack.Screen
              name="take-a-picture"
              options={{ headerShown: false }}
            ></Stack.Screen>
            <Stack.Screen
              name="store-keys"
              options={{ headerShown: false }}
            ></Stack.Screen>
            <Stack.Screen
              name="(tabs)"
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="import-credential/import"
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="import-credential/view"
              options={{
                headerShown: false,
              }}
            />
          </Stack>
        </BttmSheetProvider>
      </Provider>
    </QueryClientProvider>
  );
}
