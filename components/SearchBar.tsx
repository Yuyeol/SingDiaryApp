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
import InputField from "@/components/common/InputField";
import { SearchCategory } from "@/types";
import SearchPicker from "@/components/common/SearchPicker";

interface Props {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  category: SearchCategory;
  onCategoryChange: (category: SearchCategory) => void;
}

const SearchBar = ({
  value,
  onChangeText,
  placeholder = "노래 검색",
  category,
  onCategoryChange,
}: Props) => {
  const [isPickerOpen, setIsPickerOpen] = useState(false);

  // 카테고리 레이블 가져오기
  const getCategoryLabel = (cat: SearchCategory) => {
    switch (cat) {
      case "title":
        return "곡명";
      case "singer":
        return "가수";
      default:
        return "곡명";
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TouchableOpacity
          style={styles.categoryContainer}
          onPress={() => setIsPickerOpen(true)}
        >
          <Text style={styles.category}>{getCategoryLabel(category)}</Text>
          <Ionicons name="chevron-down" size={16} color="#333" />
        </TouchableOpacity>

        <InputField
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#999"
          returnKeyType="search"
          variant="search"
        />
      </View>
      <SearchPicker
        isPickerOpen={isPickerOpen}
        setIsPickerOpen={setIsPickerOpen}
        category={category}
        onCategoryChange={onCategoryChange}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    padding: 4,
    borderWidth: 1,
    borderColor: "#eaeaea",
  },
  categoryContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
  },
  category: {
    color: "#333",
    marginRight: 4,
    fontSize: 14,
    fontWeight: "500",
  },
  searchButton: {
    padding: 8,
  },
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
  pickerTitle: {
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
