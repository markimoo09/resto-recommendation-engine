import React, { useState } from "react";
import { Alert, Button, Text, View } from "react-native";

import { authManager } from "@/services/auth_manager";

export default function SignInScreen() {
  const [loading, setLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      await authManager.signInWithGoogle();
    } catch (error) {
      Alert.alert("Sign in failed", "Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View>
      <Text>Sign In</Text>
      <Button
        title={loading ? "Signing in..." : "Sign in with Google"}
        disabled={loading}
        onPress={handleGoogleSignIn}
      />
    </View>
  );
}
