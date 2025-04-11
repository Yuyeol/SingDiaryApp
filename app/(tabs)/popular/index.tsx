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
  const { data, isLoading } = usePopularSongs(karaokeType);
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
  if (isLoading)
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#FF6B57" />
      </View>
    );

  if (!songs)
    return (
      <View style={styles.centered}>
        <Text style={styles.emptyText}>
          노래 목록을 불러오는데 실패했습니다.
        </Text>
      </View>
    );

  if (!songs || songs.length === 0)
    return (
      <View style={styles.centered}>
        <Text style={styles.emptyText}>노래 목록이 없습니다.</Text>
      </View>
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
          onPressSong={handlePressSong}
          onToggleFavorite={handleToggleFavorite}
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
