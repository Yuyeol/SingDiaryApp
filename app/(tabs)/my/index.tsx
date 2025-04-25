import React, { useCallback } from "react";
import { SafeAreaView, StyleSheet, View, Text } from "react-native";
import useFavoriteSongsStore from "@/store/favoriteSongs";
import SongList from "@/components/SongList/SongList";
import { useRouter } from "expo-router";
import { Song } from "@/app/types/songs";
import { PopularSong } from "@/app/types/popularSongs";

export default function MyScreen() {
  const favoriteSongs = useFavoriteSongsStore((state) => state.favoriteSongs);
  const isLoading = useFavoriteSongsStore((state) => state.isLoading);
  const toggleFavoriteSong = useFavoriteSongsStore(
    (state) => state.toggleFavoriteSong
  );
  const router = useRouter();

  const handleToggleFavorite = useCallback(
    (id: number) => {
      const song = favoriteSongs.find((song) => song.id === id);
      if (song) {
        toggleFavoriteSong(song);
      }
    },
    [favoriteSongs, toggleFavoriteSong]
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

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>내가 좋아하는 노래</Text>
      </View>
      <SongList
        songs={favoriteSongs}
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
