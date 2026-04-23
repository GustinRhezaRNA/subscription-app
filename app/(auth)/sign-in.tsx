import "@/global.css";
import { Text, View } from "react-native";
import { Link } from "expo-router";

export default function SignIn() {
    return (
        <View className="auth-safe-area">
            <Text className="text-xl font-bold text-success">
                Sign In
            </Text>
            <Link href="/(auth)/sign-up" >
                <Text className="text-accent">Create Account</Text>
            </Link>
        </View>
    );
}