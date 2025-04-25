import React, { useState, useMemo, useCallback } from "react";
import { SafeAreaView, View, StyleSheet } from "react-native";
import SearchBar from "@/components/SearchBar";
import { Brand, SearchCategory } from "@/app/types";
import useSearchedSongs from "@/hooks/queries/useSearchedSongs";
import SongList from "@/components/SongList/SongList";
import { debounce } from "lodash";
import useFavoriteSongsStore from "@/store/favoriteSongs";
import BrandToggle from "@/components/BrandToggle";

export default function HomeScreen() {
  const [brand, setBrand] = useState<Brand>("tj");
  const [searchCategory, setSearchCategory] = useState<SearchCategory>("title");
  const [searchTerm, setSearchTerm] = useState("");
  const toggleFavoriteSong = useFavoriteSongsStore(
    (state) => state.toggleFavoriteSong
  );
  const getIsFavoriteSong = useFavoriteSongsStore(
    (state) => state.getIsFavoriteSong
  );
  const { data, isLoading, isError, refetch } = useSearchedSongs(
    brand,
    searchCategory,
    searchTerm
  );
  const searchedSongs = searchCategory === "title" ? data?.title : data?.singer;

  // 디바운스 함수 생성 및 유지
  const debouncedRefetch = useMemo(
    () =>
      debounce(() => {
        if (searchTerm.trim()) refetch();
      }, 1000),
    [searchTerm]
  );

  // 검색어 변경 핸들러
  const handleSearchTermChange = (text: string) => {
    setSearchTerm(text);
    debouncedRefetch();
  };

  const handleTypeChange = (type: Brand) => {
    setBrand(type);
  };

  const handleToggleFavorite = useCallback(
    (id: number) => {
      if (!searchedSongs) return;
      const song = searchedSongs.find((song) => song.id === id);
      if (song) {
        toggleFavoriteSong(song, brand);
      }
    },
    [searchedSongs, toggleFavoriteSong]
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <BrandToggle selectedBrand={brand} onBrandChange={handleTypeChange} />

        <SearchBar
          value={searchTerm}
          onChangeText={handleSearchTermChange}
          category={searchCategory}
          onCategoryChange={setSearchCategory}
        />

        <SongList
          songs={searchedSongs}
          onToggleFavorite={handleToggleFavorite}
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
