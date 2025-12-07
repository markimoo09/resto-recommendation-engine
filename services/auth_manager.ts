import { AuthChangeEvent, Session } from "@supabase/supabase-js";
import { makeRedirectUri } from "expo-auth-session";
import * as Linking from "expo-linking";
import * as WebBrowser from "expo-web-browser";

import { supabase } from "@/utils/supabase";

type AuthCallback = (
  event: AuthChangeEvent | "INITIAL_SESSION",
  session: Session | null
) => void;

const redirectTo = makeRedirectUri({ scheme: "kilo", path: "auth/callback" });

export const authManager = {
  signInWithGoogle: async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo, skipBrowserRedirect: true },
    });

    if (error) throw error;
    if (!data?.url) throw new Error("Missing auth URL");

    const res = await WebBrowser.openAuthSessionAsync(data.url, redirectTo);
    if (res.type === "success" && res.url) {
      const { queryParams } = Linking.parse(res.url);
      const codeParam = queryParams?.["code"];
      const code =
        typeof codeParam === "string"
          ? codeParam
          : Array.isArray(codeParam)
          ? codeParam[0]
          : undefined;
      if (!code) throw new Error("No auth code returned");

      const { error: exchangeError } =
        await supabase.auth.exchangeCodeForSession(code);
      if (exchangeError) throw exchangeError;
    }
  },

  signOut: async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  onAuthStateChange: (callback: AuthCallback) => {
    const { data: listener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        callback(event, session);
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  },
};
