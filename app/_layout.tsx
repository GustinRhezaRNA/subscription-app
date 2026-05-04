import "@/global.css"
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
import { ClerkProvider } from '@clerk/expo';
import { tokenCache } from '@clerk/expo/token-cache';
import { Text, View } from "react-native";

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

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

  return (
    <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
      <Stack screenOptions={{ headerShown: false }} initialRouteName="(tabs)" />
    </ClerkProvider>
  );
}