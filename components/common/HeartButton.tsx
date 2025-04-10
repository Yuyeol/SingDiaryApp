import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/constants";

interface Props {
  isFavorite: boolean;
  onToggle: () => void;
  size?: number;
}

const HeartButton = ({ isFavorite, onToggle, size = 24 }: Props) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onToggle}
      hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
    >
      <Ionicons
        name={isFavorite ? "heart" : "heart-outline"}
        size={size}
        color={isFavorite ? colors.ORANGE_600 : "#888"}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default HeartButton;
