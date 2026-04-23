import "@/global.css";
import { Link } from "expo-router";
import { Text } from "react-native";

import { styled } from "nativewind";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";
const SafeAreaView = styled(RNSafeAreaView);

export default function App() {
  return (
    <SafeAreaView className="flex-1 bg-background font-sans-extrabold p-5">
      <Text className="font-bold text-primary text-7xl">
        Home
      </Text>
      <Link href="./onboarding" className="mt-4 font-sans-bold rounded bg-primary text-white p-4">
        <Text className="text-accent">Go to Onboarding</Text>
      </Link>
      <Link href="./(auth)/sign-in" className="mt-4 font-sans-bold rounded bg-primary text-white p-4">
        <Text className="text-accent">Go to Sign In</Text>
      </Link>
      <Link href="./(auth)/sign-up" className="mt-4 font-sans-bold rounded bg-primary text-white p-4">
        <Text className="text-accent">Go to Sign Up</Text>
      </Link>
    </SafeAreaView>
  );
}