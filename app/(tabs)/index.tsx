import "@/global.css";
import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function App() {
  return (
    <View className="flex-1 items-center justify-center bg-background">
      <Text className="text-xl font-bold text-success">
        Welcome to Nativewind!
      </Text>
      <Link href="./onboarding" >
        <Text className="text-accent">Go to Onboarding</Text>
      </Link>
      <Link href="./(auth)/sign-in" >
        <Text className="text-accent">Go to Sign In</Text>
      </Link>
      <Link href="./(auth)/sign-up" >
        <Text className="text-accent">Go to Sign Up</Text>
      </Link>
      <Link href="./(tabs)/subscriptions/1" >
        <Text className="text-accent">Go to Subscription 1</Text>
      </Link>
      <Link href="./(tabs)/subscriptions/2" >
        <Text className="text-accent">Go to Subscription 2</Text>
      </Link>
      <Link href="./(tabs)/subscriptions/3" >
        <Text className="text-accent">Go to Subscription 3</Text>
      </Link>
    </View>
  );
}