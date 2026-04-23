import "@/global.css"
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
export const unstable_settings = {
  // Ensure that reloading on `/` keeps the user in the `(tabs)` layout.
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
    if (!fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Stack screenOptions={{ headerShown: false }} initialRouteName="(tabs)" />
  );
}