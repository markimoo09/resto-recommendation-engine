import { AuthChangeEvent, Session } from "@supabase/supabase-js";
import { makeRedirectUri } from "expo-auth-session";

import { supabase } from "@/utils/supabase";

type AuthCallback = (
  event: AuthChangeEvent | "INITIAL_SESSION",
  session: Session | null
) => void;

const redirectTo = makeRedirectUri({
  scheme: "kilo",
  path: "auth/callback",
  native: "kilo://auth/callback",
});

console.log("redirectTo", redirectTo);

export const authManager = {
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
