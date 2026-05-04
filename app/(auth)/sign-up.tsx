import React, { useState } from "react";
import { View, Text, TextInput, Pressable, KeyboardAvoidingView, Platform, ScrollView, ActivityIndicator } from "react-native";
import { type Href, Link, useRouter } from "expo-router";
import { useSignUp, useAuth } from "@clerk/expo";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SignUp() {
  const { signUp, errors, fetchStatus } = useSignUp();
  const { isSignedIn } = useAuth();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");

  const onSignUpPress = async () => {
    const { error } = await signUp.password({
      emailAddress,
      password,
    });

    if (error) {
      console.error(JSON.stringify(error, null, 2));
      return;
    }

    if (!error) await signUp.verifications.sendEmailCode();
  };

  const onPressVerify = async () => {
    await signUp.verifications.verifyEmailCode({
      code,
    });

    if (signUp.status === "complete") {
      await signUp.finalize({
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
      console.error("Sign-up attempt not complete:", signUp);
    }
  };

  const loading = fetchStatus === "fetching";

  if (signUp.status === "complete" || isSignedIn) {
    return null;
  }

  const pendingVerification =
    signUp.status === "missing_requirements" &&
    signUp.unverifiedFields.includes("email_address") &&
    signUp.missingFields.length === 0;

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
            <Text className="auth-title">Create account</Text>
            <Text className="auth-subtitle">
              {pendingVerification ? "Enter the verification code sent to your email" : "Sign up to start managing your subscriptions"}
            </Text>
          </View>

          <View className="auth-card">
            <View className="auth-form">
              
              {!pendingVerification && (
                <>
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
                  {errors?.fields?.emailAddress && (
                    <Text className="text-destructive text-sm -mt-2 mb-1">{errors.fields.emailAddress.message}</Text>
                  )}

                  <View className="auth-field">
                    <Text className="auth-label">Password</Text>
                    <TextInput
                      className="auth-input"
                      value={password}
                      placeholder="Create a password"
                      placeholderTextColor="rgba(0, 0, 0, 0.4)"
                      secureTextEntry
                      onChangeText={setPassword}
                    />
                  </View>
                  {errors?.fields?.password && (
                    <Text className="text-destructive text-sm -mt-2 mb-1">{errors.fields.password.message}</Text>
                  )}

                  <Pressable
                    onPress={onSignUpPress}
                    disabled={loading || !emailAddress || !password}
                    className={`auth-button ${(loading || !emailAddress || !password) ? "auth-button-disabled" : ""}`}
                  >
                    {loading ? (
                      <ActivityIndicator color="#fff" />
                    ) : (
                      <Text className="auth-button-text">Sign up</Text>
                    )}
                  </Pressable>
                </>
              )}

              {pendingVerification && (
                <>
                  <View className="auth-field">
                    <Text className="auth-label">Verification Code</Text>
                    <TextInput
                      className="auth-input"
                      value={code}
                      placeholder="Enter code"
                      placeholderTextColor="rgba(0, 0, 0, 0.4)"
                      keyboardType="numeric"
                      onChangeText={setCode}
                    />
                  </View>
                  {errors?.fields?.code && (
                    <Text className="text-destructive text-sm -mt-2 mb-1">{errors.fields.code.message}</Text>
                  )}

                  <Pressable
                    onPress={onPressVerify}
                    disabled={loading || !code}
                    className={`auth-button ${(loading || !code) ? "auth-button-disabled" : ""}`}
                  >
                    {loading ? (
                      <ActivityIndicator color="#fff" />
                    ) : (
                      <Text className="auth-button-text">Verify Email</Text>
                    )}
                  </Pressable>
                  
                  <Pressable
                    onPress={() => signUp.verifications.sendEmailCode()}
                    className="auth-secondary-button mt-2"
                  >
                     <Text className="auth-secondary-button-text">I need a new code</Text>
                  </Pressable>
                </>
              )}

              {!pendingVerification && (
                <View className="auth-link-row">
                  <Text className="auth-link-copy">Already have an account?</Text>
                  <Link href="/(auth)/sign-in" asChild>
                    <Pressable>
                      <Text className="auth-link">Sign in</Text>
                    </Pressable>
                  </Link>
                </View>
              )}
            </View>
          </View>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}