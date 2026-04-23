import "@/global.css";
import { Text, View } from "react-native";
import { Link, useLocalSearchParams } from "expo-router";


export default function SubscriptionDetail() {
    const { id } = useLocalSearchParams<{ id: string }>();
    return (
        <View className="auth-safe-area">
            <Text className="text-xl font-bold text-blue">
                Subscription {id} Detail
            </Text>
            <Link href="../" >
                <Text className="text-accent"> Go Back</Text>
            </Link>
        </View>
    );
}