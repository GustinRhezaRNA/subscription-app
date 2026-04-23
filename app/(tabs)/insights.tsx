import "@/global.css";
import { Text } from "react-native";
import { styled } from "nativewind";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";
const SafeAreaView = styled(RNSafeAreaView);

export default function SignUp() {
    return (
        <SafeAreaView className="auth-safe-area">
            <Text>Insights</Text>
        </SafeAreaView>
    );
}