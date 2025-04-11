import React from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/constants";

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  onSearch: () => void;
  placeholder?: string;
  category?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChangeText,
  onSearch,
  placeholder = "노래 검색",
  category = "곡명",
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <View style={styles.categoryContainer}>
          <Text style={styles.category}>{category}</Text>
          <Ionicons name="chevron-down" size={16} color="#333" />
        </View>
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#999"
          returnKeyType="search"
          onSubmitEditing={onSearch}
        />
        <TouchableOpacity onPress={onSearch} style={styles.searchButton}>
          <Ionicons name="search" size={24} color="#333" />
        </TouchableOpacity>
      </View>
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
  input: {
    flex: 1,
    height: 40,
    color: "#333",
    fontSize: 16,
  },
  searchButton: {
    padding: 8,
  },
});

export default SearchBar;
