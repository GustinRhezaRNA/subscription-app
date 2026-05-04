import "@/global.css";
import { FlatList, Text, TextInput, View } from "react-native";
import { styled } from "nativewind";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";
import { useState, useMemo } from "react";
import SubscriptionCard from "@/components/SubscriptionCard";
import { useSubscription } from "@/context/SubscriptionContext";

const SafeAreaView = styled(RNSafeAreaView);

export default function SubscriptionsTab() {
    const { subscriptions } = useSubscription();
    const [searchQuery, setSearchQuery] = useState("");
    const [expandedSubscriptionId, setExpandedSubscriptionId] = useState<string | null>(null);

    const filteredSubscriptions = useMemo(() => {
        if (!searchQuery.trim()) return subscriptions;
        const query = searchQuery.toLowerCase();
        return subscriptions.filter(
            (sub) =>
                sub.name.toLowerCase().includes(query) ||
                (sub.category && sub.category.toLowerCase().includes(query)) ||
                (sub.plan && sub.plan.toLowerCase().includes(query))
        );
    }, [searchQuery, subscriptions]);

    return (
        <SafeAreaView className="flex-1 bg-background p-5">
            <View className="mb-6 mt-4">
                <Text className="text-3xl font-sans-bold text-primary mb-4">
                    Subscriptions
                </Text>
                <TextInput
                    className="rounded-2xl border border-border bg-card px-4 py-4 text-base font-sans-medium text-primary"
                    placeholder="Search subscriptions..."
                    placeholderTextColor="rgba(0, 0, 0, 0.4)"
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
            </View>

            <FlatList
                data={filteredSubscriptions}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <SubscriptionCard
                        {...item}
                        expanded={expandedSubscriptionId === item.id}
                        onPress={() =>
                            setExpandedSubscriptionId(
                                expandedSubscriptionId === item.id ? null : item.id
                            )
                        }
                    />
                )}
                showsVerticalScrollIndicator={false}
                ItemSeparatorComponent={() => <View className="h-4" />}
                contentContainerClassName="pb-20"
                ListEmptyComponent={
                    <Text className="text-center py-4 text-sm font-sans-medium text-black/60">
                        {searchQuery ? `No subscriptions found for "${searchQuery}"` : "No subscriptions found"}
                    </Text>
                }
            />
        </SafeAreaView>
    );
}