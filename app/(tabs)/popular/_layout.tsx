import { colors } from "@/constants";
import { Stack } from "expo-router";

export default function PopularLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: colors.WHITE,
        },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
          title: "인기 차트",
        }}
      />
    </Stack>
  );
}
