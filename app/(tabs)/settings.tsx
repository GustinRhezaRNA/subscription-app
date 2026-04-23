import "@/global.css";
import { Text, View } from "react-native";
import { Link } from "expo-router";

export default function SignUp() {
    return (
        <View className="auth-safe-area">
            <Text className="text-xl font-bold text-background">
               Sign Up
            </Text>
            <Text>Already have an account?</Text>
            <Link href="/(auth)/sign-in" >
                <Text className="text-accent"> Sign In</Text>
            </Link>
        </View>
    );
}