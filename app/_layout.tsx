import "@/global.css"
import { Stack } from "expo-router";
export const unstable_settings = {
  // Ensure that reloading on `/` keeps the user in the `(tabs)` layout.
  initialRouteName: '(tabs)/index',
};
export default function RootLayout() {
  return (
      <Stack screenOptions={{ headerShown: false }} initialRouteName="(tabs)/index" />
  );
}