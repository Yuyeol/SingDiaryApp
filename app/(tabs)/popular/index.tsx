import React, { useState, useCallback } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
  Text,
} from "react-native";
import KaraokeTypeToggle from "@/components/KaraokeToggle";
import SongList from "@/components/SongList/SongList";
import { PopularSong } from "@/app/types/popularSongs";
import usePopularSongs from "@/hooks/queries/usePopularSongs";
import { KaraokeType } from "@/app/types";

export default function PopularScreen() {
  const [karaokeType, setKaraokeType] = useState<KaraokeType>("tj");
  const { data, isLoading, isError } = usePopularSongs(karaokeType);
  const songs = data?.songs;

  const handlePressSong = useCallback((song: PopularSong) => {
    console.log("Selected song:", song);
  }, []);

  const handleTypeChange = useCallback((type: KaraokeType) => {
    setKaraokeType(type);
  }, []);

  const handleToggleFavorite = useCallback((id: number) => {
    console.log("Toggled favorite for song:", id);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <KaraokeTypeToggle
          selectedType={karaokeType}
          onTypeChange={handleTypeChange}
        />
        <SongList
          songs={songs}
          onPressSong={handlePressSong}
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
