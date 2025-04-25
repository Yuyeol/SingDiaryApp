import React, { useState, useCallback } from "react";
import { View, StyleSheet, SafeAreaView } from "react-native";
import SongList from "@/components/SongList/SongList";
import usePopularSongs from "@/hooks/queries/usePopularSongs";
import { Brand } from "@/app/types";
import useFavoriteSongsStore from "@/store/favoriteSongs";
import BrandToggle from "@/components/BrandToggle";

export default function PopularScreen() {
  const [brand, setBrand] = useState<Brand>("tj");
  const { data, isLoading, isError } = usePopularSongs(brand);
  const songs = data?.songs;
  const toggleFavoriteSong = useFavoriteSongsStore(
    (state) => state.toggleFavoriteSong
  );

  const handleTypeChange = useCallback((type: Brand) => {
    setBrand(type);
  }, []);

  const handleToggleFavorite = useCallback(
    (id: number) => {
      if (!songs) return;
      const song = songs.find((song) => song.id === id);
      if (song) {
        toggleFavoriteSong(song, brand);
      }
    },
    [songs, toggleFavoriteSong]
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <BrandToggle selectedBrand={brand} onBrandChange={handleTypeChange} />
        <SongList
          songs={songs}
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
});
