import React, { useState } from "react";
import { View, Text, TextInput, Pressable, KeyboardAvoidingView, Platform, ScrollView, ActivityIndicator } from "react-native";
import { type Href, Link, useRouter } from "expo-router";
import { useSignIn } from "@clerk/expo";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SignIn() {
  const { signIn, errors, fetchStatus } = useSignIn();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");

  const onSignInPress = async () => {
    const { error } = await signIn.password({
      emailAddress,
      password,
    });

    if (error) {
      console.error(JSON.stringify(error, null, 2));
      return;
    }

    if (signIn.status === "complete") {
      await signIn.finalize({
        navigate: ({ session, decorateUrl }) => {
          if (session?.currentTask) {
            console.log(session?.currentTask);
            return;
          }
          const url = decorateUrl("/(tabs)");
          if (url.startsWith("http")) {
            window.location.href = url;
          } else {
            router.replace(url as Href);
          }
        },
      });
    } else {
      console.error("Sign-in attempt not complete:", signIn);
    }
  };

  const loading = fetchStatus === "fetching";

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff9e3' }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView contentContainerClassName="auth-content" keyboardShouldPersistTaps="handled">
          
          <View className="auth-brand-block">
            <View className="auth-logo-wrap">
              <View className="auth-logo-mark">
                <Text className="auth-logo-mark-text">S</Text>
              </View>
              <View>
                <Text className="auth-wordmark">SubsApp</Text>
                <Text className="auth-wordmark-sub">SMART BILLING</Text>
              </View>
            </View>
            <Text className="auth-title">Welcome back</Text>
            <Text className="auth-subtitle">Sign in to continue managing your subscriptions</Text>
          </View>

          <View className="auth-card">
            <View className="auth-form">
              <View className="auth-field">
                <Text className="auth-label">Email</Text>
                <TextInput
                  className="auth-input"
                  autoCapitalize="none"
                  value={emailAddress}
                  placeholder="Enter your email"
                  placeholderTextColor="rgba(0, 0, 0, 0.4)"
                  onChangeText={setEmailAddress}
                  keyboardType="email-address"
                />
              </View>
              {errors?.fields?.identifier && (
                <Text className="text-destructive text-sm -mt-2 mb-1">{errors.fields.identifier.message}</Text>
              )}

              <View className="auth-field">
                <Text className="auth-label">Password</Text>
                <TextInput
                  className="auth-input"
                  value={password}
                  placeholder="Enter your password"
                  placeholderTextColor="rgba(0, 0, 0, 0.4)"
                  secureTextEntry
                  onChangeText={setPassword}
                />
              </View>
              {errors?.fields?.password && (
                <Text className="text-destructive text-sm -mt-2 mb-1">{errors.fields.password.message}</Text>
              )}

              <Pressable
                onPress={onSignInPress}
                disabled={loading || !emailAddress || !password}
                className={`auth-button ${(loading || !emailAddress || !password) ? "auth-button-disabled" : ""}`}
              >
                {loading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text className="auth-button-text">Sign in</Text>
                )}
              </Pressable>

              <View className="auth-link-row">
                <Text className="auth-link-copy">New to SubsApp?</Text>
                <Link href="/(auth)/sign-up" asChild>
                  <Pressable>
                    <Text className="auth-link">Create an account</Text>
                  </Pressable>
                </Link>
              </View>
            </View>
          </View>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}