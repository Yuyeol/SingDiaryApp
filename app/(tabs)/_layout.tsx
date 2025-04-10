import { Tabs } from "expo-router";
import React from "react";
import { colors } from "@/constants";
import { FontAwesome } from "@expo/vector-icons";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.ORANGE_600,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "홈",
          tabBarIcon: ({ color }: { color: string }) => (
            <FontAwesome name="home" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="popular"
        options={{
          title: "인기",
          tabBarIcon: ({ color }: { color: string }) => (
            <FontAwesome name="trophy" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="my"
        options={{
          title: "내 프로필",
          tabBarIcon: ({ color }: { color: string }) => (
            <FontAwesome name="user" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="setting"
        options={{
          title: "설정",
          tabBarIcon: ({ color }: { color: string }) => (
            <FontAwesome name="gear" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
