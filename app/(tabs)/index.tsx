import "@/global.css";
import { FlatList, Text, View } from "react-native";
import { Image } from "expo-image";
import { styled } from "nativewind";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";
import images from "@/constants/images";
import {
  HOME_BALANCE,
  HOME_SUBSCRIPTIONS,
  HOME_USER,
  UPCOMING_SUBSCRIPTIONS,
} from "@/constants/data";
import { icons } from "@/constants/icons";
import { formatCurrency } from "@/lib/utils";
import dayjs from "dayjs";
import ListHeading from "@/components/ListHeading";
import UpcomingSubscriptionCard from "@/components/UpcomingSubscriptionCard";
import SubscriptionCard from "@/components/SubscriptionCard";
import CreateSubscriptionModal from "@/components/CreateSubscriptionModal";
import { useState, useCallback } from "react";
import { useUser } from "@clerk/expo";
import { Pressable, TouchableOpacity } from "react-native";

const SafeAreaView = styled(RNSafeAreaView);

export default function App() {
  const { user, isLoaded } = useUser();

  const [subscriptions, setSubscriptions] = useState(HOME_SUBSCRIPTIONS);
  const [modalVisible, setModalVisible] = useState(false);
  const [expandedSubscriptionId, setExpandedSubscriptionId] =
    useState<string | null>(null);

  const avatarUrl = user?.imageUrl
    ? `${user.imageUrl}?width=200&height=200&quality=100&fit=crop`
    : null;

  const renderHeader = useCallback(
    () => (
      <>
        <View className="home-header">
          <View className="home-user">
            <Image
              source={avatarUrl || images.avatar}
              placeholder={images.avatar}
              className="home-avatar"
              style={{ width: 64, height: 64, borderRadius: 32 }}
              contentFit="cover"
              transition={500}
            />
            <Text className="home-user-name">
              {user?.fullName || HOME_USER.name}
            </Text>
          </View>

          <TouchableOpacity 
            onPress={() => setModalVisible(true)} 
            activeOpacity={0.7}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            className="size-12 items-center justify-center"
          >
            <Image 
              source={icons.add} 
              className="home-add-icon" 
              style={{ width: 48, height: 48 }}
              contentFit="contain"
            />
          </TouchableOpacity>
        </View>

        <View className="home-balance-card">
          <Text className="home-balance-label">Balance</Text>
          <View className="home-balance-row">
            <Text className="home-balance-amount">
              {formatCurrency(HOME_BALANCE.amount)}
            </Text>
            <Text className="home-balance-date">
              {dayjs(HOME_BALANCE.nextRenewalDate).format("MM/DD")}
            </Text>
          </View>
        </View>

        <View className="mb-5">
          <ListHeading title="Upcoming" />
          <FlatList
            data={UPCOMING_SUBSCRIPTIONS}
            renderItem={({ item }) => (
              <UpcomingSubscriptionCard {...item} />
            )}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            ListEmptyComponent={
              <Text className="home-empty-state">
                No Upcoming Renewals Yet
              </Text>
            }
          />
        </View>

        <ListHeading title="All Subscriptions" />
      </>
    ),
    [user, avatarUrl, setModalVisible]
  );

  if (!isLoaded) return null;

  return (
    <SafeAreaView className="flex-1 bg-background p-5">
      <FlatList
        ListHeaderComponent={renderHeader}
        data={subscriptions}
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
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <Text className="home-empty-state">
            No Subscriptions Found
          </Text>
        }
        extraData={expandedSubscriptionId}
        ItemSeparatorComponent={() => <View className="h-4" />}
        contentContainerClassName="pb-20"
      />
      <CreateSubscriptionModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSubmit={(newSub) => {
          HOME_SUBSCRIPTIONS.unshift(newSub);
          setSubscriptions([...HOME_SUBSCRIPTIONS]);
          setModalVisible(false);
        }}
      />
    </SafeAreaView>
  );
}