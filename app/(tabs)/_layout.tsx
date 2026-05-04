import { Redirect, Tabs } from "expo-router";
import { tabs } from '@/constants/data'
import { Image, View, ImageSourcePropType } from "react-native";
import clsx from "clsx";
import { colors, components } from "@/constants/theme";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAuth } from "@clerk/expo";
import { Text } from "react-native";


const TabLayout = () => {

    const { isSignedIn, isLoaded } = useAuth();
    const tabBar = components.tabBar;
    const insets = useSafeAreaInsets();

    if (!isLoaded) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <Text>Loading Tabs...</Text>
            </View>
        );
    }

    if (!isSignedIn) {
        return <Redirect href="/(auth)/sign-in" />;
    }

    const TabIcon = ({ focused, icon }: { focused: boolean, icon: ImageSourcePropType }) => {
        return (
            <View className="tabs-icon">
                <View className={clsx('tabs-pill', focused && 'tabs-active')}>

                    <Image source={icon} className="tabs-glyph" />
                </View>
            </View>
        )
    }
    return (
        <Tabs
            screenOptions={
                {
                    headerShown: false,
                    tabBarShowLabel: false,
                    tabBarStyle: {
                        position: 'absolute',
                        bottom: Math.max(insets.bottom, tabBar.horizontalInset),
                        height: tabBar.height,
                        marginHorizontal: tabBar.horizontalInset,
                        borderRadius: tabBar.radius,
                        backgroundColor: colors.primary,
                        borderTopWidth: 0,
                        elevation: 0,
                    },
                    tabBarItemStyle: {
                        paddingVertical: tabBar.height / 2 - tabBar.iconFrame / 1.6,
                    },
                    tabBarIconStyle: {
                        width: tabBar.iconFrame,
                        height: tabBar.iconFrame,
                        alignItems: 'center',
                    }
                }
            }
        >
            {tabs.map((tab) => (
                <Tabs.Screen key={tab.name} name={tab.name} options={{
                    title: tab.title,
                    tabBarIcon: ({ focused }) => (
                        <TabIcon focused={focused} icon={tab.icon} />
                    )
                }} />
            ))}

        </Tabs>
    );

}

export default TabLayout;
