import { supabase } from "@/utils/supabase";
import {
  GoogleSignin,
  GoogleSigninButton,
  isSuccessResponse,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

export default function SignInScreen() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        process.env.EXPO_PUBLIC_SUPABASE_AUTH_EXTERNAL_GOOGLE_CLIENT_ID ?? "",
      iosClientId: process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID ?? "",
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Sign In</Text>
        <GoogleSigninButton
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
          onPress={async () => {
            try {
              setLoading(true);
              await GoogleSignin.hasPlayServices();
              const response = await GoogleSignin.signIn();
              if (isSuccessResponse(response)) {
                const idToken = response.data?.idToken;
                if (!idToken) {
                  throw new Error("Missing idToken from Google");
                }

                const { data, error } = await supabase.auth.signInWithIdToken({
                  provider: "google",
                  token: idToken,
                });
                console.log(error, data);

                if (!error) {
                  router.replace("/(tabs)");
                }
              }
            } catch (error: any) {
              if (error.code === statusCodes.IN_PROGRESS) {
                console.log("In Progress");
              } else if (
                error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE
              ) {
                console.log("Play Services Not Available");
              } else {
                console.log("Authentication Error: ", error);
              }
            } finally {
              setLoading(false);
            }
          }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
});
