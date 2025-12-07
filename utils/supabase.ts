import { createClient } from "@supabase/supabase-js";
import "expo-sqlite/localStorage/install";

const useLocal = process.env.ENVIRONMENT === "development";

const supabaseUrl = useLocal
  ? process.env.EXPO_LOCAL_SUPABASE_URL
  : process.env.EXPO_PUBLIC_SUPABASE_URL;

const supabasePublishableKey = useLocal
  ? process.env.EXPO_LOCAL_SUPABASE_PUBLISHABLE_KEY
  : process.env.EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

if (!supabaseUrl || !supabasePublishableKey) {
  throw new Error("Supabase URL or publishable key is not set");
}

export const supabase = createClient(supabaseUrl, supabasePublishableKey, {
  auth: {
    storage: localStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
