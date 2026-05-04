import "@/global.css";
import { Text, View, TouchableOpacity, ScrollView } from "react-native";
import { Image } from "expo-image";
import { styled } from "nativewind";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";
import { useUser, useClerk } from "@clerk/expo";
import images from "@/constants/images";
import dayjs from "dayjs";

const SafeAreaView = styled(RNSafeAreaView);

export default function Settings() {
  const { user } = useUser();
  const { signOut } = useClerk();

  const handleLogout = async () => {
    try {
      await signOut();
    } catch (err: any) {
      console.error("Logout error:", err.message || "Failed to sign out");
    }
  };

  const avatarUrl = user?.imageUrl
    ? `${user.imageUrl}?width=400&height=400&quality=100&fit=crop`
    : null;

  return (
    <SafeAreaView className="auth-safe-area">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="settings-screen">
          <Text className="settings-title">Settings</Text>

          <View className="settings-user-card">
            <View className="settings-avatar-container">
              <Image
                source={avatarUrl || images.avatar}
                placeholder={images.avatar}
                className="settings-avatar"
                style={{ width: 96, height: 96, borderRadius: 48 }}
                contentFit="cover"
                transition={500}
              />
            </View>

            <View className="settings-user-info">
              <Text className="settings-user-name">
                {user?.fullName || "User Name"}
              </Text>
              <Text className="settings-user-email">
                {user?.primaryEmailAddress?.emailAddress || "Email Address"}
              </Text>
            </View>
          </View>

          <Text className="settings-section-title">Account</Text>
          <View className="settings-info-card">
            <View className="settings-info-row settings-info-border">
              <Text className="settings-info-label">Account ID</Text>
              <Text
                className="settings-info-value flex-1 text-right ml-4"
                numberOfLines={1}
                ellipsizeMode="middle"
              >
                {user?.id || "N/A"}
              </Text>
            </View>
            <View className="settings-info-row">
              <Text className="settings-info-label">Joined</Text>
              <Text className="settings-info-value">
                {user?.createdAt
                  ? dayjs(user.createdAt).format("MMM DD, YYYY")
                  : "N/A"}
              </Text>
            </View>
          </View>

          <View className="settings-actions">
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={handleLogout}
              className="logout-button"
            >
              <Text className="logout-button-text">Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}