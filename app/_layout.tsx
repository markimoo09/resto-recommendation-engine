import React, { useEffect, useState } from "react";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Redirect, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import type { Session } from "@supabase/supabase-js";

import { useColorScheme } from "@/hooks/use-color-scheme";
import { authManager } from "@/services/auth_manager";

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [session, setSession] = useState<Session | null>(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const unsubscribe = authManager.onAuthStateChange((event, nextSession) => {
      setSession(nextSession);
      setInitializing(false);
      console.log("auth event", event, !!nextSession);
    });

    return unsubscribe;
  }, []);

  if (initializing) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      {session ? (
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      ) : (
        <>
          <Stack>
            <Stack.Screen name="sign-in" options={{ headerShown: false }} />
          </Stack>
          <Redirect href="/sign-in" />
        </>
      )}
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
