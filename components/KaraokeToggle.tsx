import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { colors } from "@/constants";

type KaraokeType = "TJ" | "금영";

interface Props {
  selectedType: KaraokeType;
  onTypeChange: (type: KaraokeType) => void;
}

const KaraokeTypeToggle = ({ selectedType, onTypeChange }: Props) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.toggleButton,
          selectedType === "TJ" && styles.selectedButton,
        ]}
        onPress={() => onTypeChange("TJ")}
      >
        <Text
          style={[
            styles.toggleText,
            selectedType === "TJ" && styles.selectedText,
          ]}
        >
          TJ
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.toggleButton,
          selectedType === "금영" && styles.selectedButton,
        ]}
        onPress={() => onTypeChange("금영")}
      >
        <Text
          style={[
            styles.toggleText,
            selectedType === "금영" && styles.selectedText,
          ]}
        >
          금영
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 16,
  },
  toggleButton: {
    paddingVertical: 8,
    paddingHorizontal: 24,
    borderRadius: 20,
    marginHorizontal: 8,
    backgroundColor: "#F5F5F5",
  },
  selectedButton: {
    backgroundColor: colors.ORANGE_600,
  },
  toggleText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#888",
  },
  selectedText: {
    color: colors.WHITE,
  },
});

export default KaraokeTypeToggle;
