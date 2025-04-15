import React, { useCallback } from "react";
import { SafeAreaView, StyleSheet, View, Text } from "react-native";
import { useFavoriteSongs } from "@/hooks/useFavoriteSongs";
import SongList from "@/components/SongList/SongList";

export default function MyScreen() {
  const { favoriteSongs, isLoading, toggleFavoriteSong } = useFavoriteSongs();

  const handleToggleFavorite = useCallback(
    (id: number) => {
      const song = favoriteSongs.find((song) => song.id === id);
      if (song) {
        toggleFavoriteSong(song);
      }
    },
    [favoriteSongs, toggleFavoriteSong]
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
        getIsFavoriteSong={() => true} // 무조건 좋아요가 true이므로
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
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
});
