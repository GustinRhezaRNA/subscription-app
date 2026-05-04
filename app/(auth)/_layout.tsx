import "@/global.css"
import { Redirect, Stack } from "expo-router";
import { useAuth, useSession } from "@clerk/expo";

export default function AuthLayout() {
  const { isSignedIn, isLoaded } = useAuth();
  const { session } = useSession();

  if (!isLoaded) {
    return null;
  }

  if (isSignedIn) {
    if (session?.currentTask) {
      return <Redirect href={`/(auth)/tasks/${session.currentTask}` as any} />;
    }
    return <Redirect href="/(tabs)" />;
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}
