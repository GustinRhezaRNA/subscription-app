import "@/global.css"
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
import { ClerkProvider } from '@clerk/expo';
import { tokenCache } from '@clerk/expo/token-cache';
import { Text, View } from "react-native";
import { PostHogProvider } from 'posthog-react-native';
import { SubscriptionProvider } from "@/context/SubscriptionContext";

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;
const posthogKey = process.env.EXPO_PUBLIC_POSTHOG_KEY;
const posthogHost = process.env.EXPO_PUBLIC_POSTHOG_HOST;

if (!publishableKey) {
  throw new Error('Add your Clerk Publishable Key to the .env file');
}

export const unstable_settings = {
  initialRouteName: '(tabs)',
};

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    'Jkt-Light': require('../assets/fonts/PlusJakartaSans-Light.ttf'),
    'Jkt-Regular': require('../assets/fonts/PlusJakartaSans-Regular.ttf'),
    'Jkt-Medium': require('../assets/fonts/PlusJakartaSans-Medium.ttf'),
    'Jkt-Bold': require('../assets/fonts/PlusJakartaSans-Bold.ttf'),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading Fonts...</Text>
      </View>
    );
  }

  const content = (
    <ClerkProvider
      publishableKey={publishableKey!}
      tokenCache={tokenCache}
      taskUrls={{
        'choose-organization': '/(auth)/tasks/choose-organization',
        'reset-password': '/(auth)/tasks/reset-password',
        'setup-mfa': '/(auth)/tasks/setup-mfa',
      }}
    >
      <SubscriptionProvider>
        <Stack screenOptions={{ headerShown: false }} initialRouteName="(tabs)" />
      </SubscriptionProvider>
    </ClerkProvider>
  );

  if (posthogKey) {
    return (
      <PostHogProvider
        apiKey={posthogKey}
        options={{ host: posthogHost }}
      >
        {content}
      </PostHogProvider>
    );
  }

  return content;
}