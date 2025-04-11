import React, { useState } from "react";
import { SafeAreaView, View, StyleSheet } from "react-native";
import KaraokeToggle from "@/components/KaraokeToggle";
import SearchBar from "@/components/SearchBar";
import { KaraokeType, SearchCategory } from "@/app/types";
import useSearchedSongs from "@/hooks/queries/useSearchedSongs";
import SongList from "@/components/SongList/SongList";

export default function HomeScreen() {
  const [karaokeType, setKaraokeType] = useState<KaraokeType>("tj");
  const [searchCategory, setSearchCategory] = useState<SearchCategory>("title");
  const [searchTerm, setSearchTerm] = useState("");

  const { data, isLoading, isError, refetch } = useSearchedSongs(
    karaokeType,
    searchCategory,
    searchTerm
  );
  const searchedSongs = searchCategory === "title" ? data?.title : data?.singer;
  console.log(data);

  const handleSearch = () => {
    refetch();
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
          category={searchCategory}
          onCategoryChange={setSearchCategory}
        />

        <SongList
          songs={searchedSongs}
          onPressSong={() => {}}
          onToggleFavorite={() => {}}
          isLoading={isLoading}
          isError={isError}
        />
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
