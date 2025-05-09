import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Modal,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { SearchCategory } from "@/types";

interface Props {
  category: SearchCategory;
  onCategoryChange: (category: SearchCategory) => void;
  isPickerOpen: boolean;
  setIsPickerOpen: (isPickerOpen: boolean) => void;
}

const SearchBar = ({
  category,
  onCategoryChange,
  isPickerOpen,
  setIsPickerOpen,
}: Props) => {
  return (
    <Modal
      visible={isPickerOpen}
      transparent={true}
      animationType="fade"
      onRequestClose={() => setIsPickerOpen(false)}
    >
      <Pressable
        style={styles.modalContainer}
        onPress={() => setIsPickerOpen(false)}
      >
        <Pressable onPress={(e) => e.stopPropagation()}>
          <View style={styles.pickerContainer}>
            <View style={styles.pickerHeader}>
              <Text style={styles.pickerHeaderText}>검색 기준 선택</Text>
              <TouchableOpacity
                onPress={() => setIsPickerOpen(false)}
                style={styles.closeButton}
              >
                <Ionicons name="close" size={24} color="#333" />
              </TouchableOpacity>
            </View>

            <Picker
              selectedValue={category}
              onValueChange={(itemValue) => {
                onCategoryChange(itemValue as SearchCategory);
                setIsPickerOpen(false);
              }}
              style={styles.picker}
            >
              <Picker.Item label="곡명" value="title" />
              <Picker.Item label="가수" value="singer" />
            </Picker>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  pickerContainer: {
    width: 300,
    backgroundColor: "#fff",
    borderRadius: 12,
  },
  pickerHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#eaeaea",
  },
  pickerHeaderText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  closeButton: {
    padding: 0,
  },
  picker: {
    width: "100%",
  },
});

export default SearchBar;
