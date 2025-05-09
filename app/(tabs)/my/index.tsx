import React, { useCallback, useMemo, useState } from "react";
import { SafeAreaView, StyleSheet, View, Text } from "react-native";
import useFavoriteSongsStore from "@/store/favoriteSongs";
import SongList from "@/components/SongList/SongList";
import { useRouter } from "expo-router";
import { Song } from "@/types/songs";
import { PopularSong } from "@/types/popularSongs";
import { Brand } from "@/types";
import BrandToggle from "@/components/BrandToggle";

export default function MyScreen() {
  const [brand, setBrand] = useState<Brand>("tj");
  const favoriteSongs = useFavoriteSongsStore((state) => state.favoriteSongs);
  const isLoading = useFavoriteSongsStore((state) => state.isLoading);
  const toggleFavoriteSong = useFavoriteSongsStore(
    (state) => state.toggleFavoriteSong
  );
  const router = useRouter();

  const handleTypeChange = useCallback((type: Brand) => {
    setBrand(type);
  }, []);

  const handleToggleFavorite = useCallback(
    (id: number) => {
      const song = favoriteSongs.find((song) => song.id === id);
      if (song) {
        toggleFavoriteSong(song, brand);
      }
    },
    [favoriteSongs, toggleFavoriteSong, brand]
  );

  const handleSongPress = useCallback(
    (song: Song | PopularSong) => {
      router.push({
        pathname: "/song-detail/[id]",
        params: { id: song.id.toString() },
      });
    },
    [router]
  );

  const getFavoriteSongsByKaraoke = useCallback(() => {
    return brand === "ky"
      ? favoriteSongs.filter((song) => song.brand === "ky")
      : favoriteSongs.filter((song) => song.brand === "tj");
  }, [favoriteSongs, brand]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>내가 저장한 노래</Text>
      </View>
      <BrandToggle selectedBrand={brand} onBrandChange={handleTypeChange} />
      <SongList
        songs={getFavoriteSongsByKaraoke()}
        onToggleFavorite={handleToggleFavorite}
        isLoading={isLoading}
        isError={false}
        onSongPress={handleSongPress}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
});
