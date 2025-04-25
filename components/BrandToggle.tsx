import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { colors } from "@/constants";
import { Brand } from "@/app/types";

interface Props {
  selectedBrand: Brand;
  onBrandChange: (type: Brand) => void;
}

const BrandToggle = ({ selectedBrand, onBrandChange }: Props) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.toggleButton,
          selectedBrand === "tj" && styles.selectedButton,
        ]}
        onPress={() => onBrandChange("tj")}
      >
        <Text
          style={[
            styles.toggleText,
            selectedBrand === "tj" && styles.selectedText,
          ]}
        >
          TJ
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.toggleButton,
          selectedBrand === "ky" && styles.selectedButton,
        ]}
        onPress={() => onBrandChange("ky")}
      >
        <Text
          style={[
            styles.toggleText,
            selectedBrand === "ky" && styles.selectedText,
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
    marginTop: 16,
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

export default BrandToggle;
