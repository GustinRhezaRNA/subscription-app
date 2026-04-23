import "@/global.css";
import { Text, View } from "react-native";
import { Link } from "expo-router";
import { styled } from "nativewind";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";
const SafeAreaView = styled(RNSafeAreaView);

export default function SignUp() {
    return (
        <SafeAreaView className="auth-safe-area">
            <Text className="text-xl font-bold">
                Settings
            </Text>
        </SafeAreaView>
    );
}