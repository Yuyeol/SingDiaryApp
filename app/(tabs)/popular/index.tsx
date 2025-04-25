import React, { useState, useCallback } from "react";
import { View, StyleSheet, SafeAreaView } from "react-native";
import KaraokeTypeToggle from "@/components/KaraokeToggle";
import SongList from "@/components/SongList/SongList";
import usePopularSongs from "@/hooks/queries/usePopularSongs";
import { KaraokeType } from "@/app/types";
import useFavoriteSongsStore from "@/store/favoriteSongs";

export default function PopularScreen() {
  const [karaokeType, setKaraokeType] = useState<KaraokeType>("tj");
  const { data, isLoading, isError } = usePopularSongs(karaokeType);
  const songs = data?.songs;
  const toggleFavoriteSong = useFavoriteSongsStore(
    (state) => state.toggleFavoriteSong
  );

  const handleTypeChange = useCallback((type: KaraokeType) => {
    setKaraokeType(type);
  }, []);

  const handleToggleFavorite = useCallback(
    (id: number) => {
      if (!songs) return;
      const song = songs.find((song) => song.id === id);
      if (song) {
        toggleFavoriteSong(song);
      }
    },
    [songs, toggleFavoriteSong]
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <KaraokeTypeToggle
          selectedType={karaokeType}
          onTypeChange={handleTypeChange}
        />
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
