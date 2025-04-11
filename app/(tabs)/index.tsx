import React, { useState } from "react";
import { SafeAreaView, View, Text, StyleSheet } from "react-native";
import KaraokeToggle from "@/components/KaraokeToggle";
import SearchBar from "@/components/SearchBar";
import { KaraokeType } from "@/app/types";

export default function HomeScreen() {
  const [karaokeType, setKaraokeType] = useState<KaraokeType>("tj");
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    console.log(`검색어: ${searchTerm}, 타입: ${karaokeType}`);
  };

  const handleTypeChange = (type: KaraokeType) => {
    setKaraokeType(type);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <KaraokeToggle
          selectedType={karaokeType}
          onTypeChange={handleTypeChange}
        />

        <SearchBar
          value={searchTerm}
          onChangeText={setSearchTerm}
          onSearch={handleSearch}
        />

        <View style={styles.centered}>
          <Text style={styles.emptyText}>검색어를 입력해 주세요</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    flex: 1,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
  },
  emptyText: {
    fontSize: 16,
    color: "#888",
  },
});
