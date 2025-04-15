import React from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import SongItem from "@/components/SongList/SongItem";
import { PopularSong } from "@/app/types/popularSongs";
import { Song } from "@/app/types/songs";

interface Props<T> {
  songs: T[] | undefined;
  onToggleFavorite: (id: number) => void;
  isLoading: boolean;
  isError: boolean;
  getIsFavoriteSong?: (id: number) => boolean;
}

function SongList<T extends Song | PopularSong>({
  songs,
  onToggleFavorite,
  isLoading,
  isError,
  getIsFavoriteSong,
}: Props<T>) {
  if (isLoading)
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#FF6B57" />
      </View>
    );
  if (isError)
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
    <FlatList
      data={songs}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <SongItem
          song={item}
          onToggleFavorite={onToggleFavorite}
          isFavorite={getIsFavoriteSong ? getIsFavoriteSong(item.id) : false}
        />
      )}
      contentContainerStyle={styles.listContent}
    />
  );
}

const styles = StyleSheet.create({
  listContent: {
    flexGrow: 1,
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

export default SongList;
