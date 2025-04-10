import React from "react";
import {
  FlatList,
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
} from "react-native";
import SongItem, { Song } from "./SongItem";

interface Props {
  songs: Song[];
  loading: boolean;
  onPressSong: (song: Song) => void;
  onToggleFavorite: (id: string) => void;
}

const SongList = ({ songs, loading, onPressSong, onToggleFavorite }: Props) => {
  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#FF6B57" />
      </View>
    );
  }

  if (!songs || songs.length === 0) {
    return (
      <View style={styles.centered}>
        <Text style={styles.emptyText}>노래 목록이 없습니다.</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={songs}
      keyExtractor={(item) => item.id}
      renderItem={({ item, index }) => (
        <SongItem
          song={item}
          index={index}
          onPressSong={onPressSong}
          onToggleFavorite={onToggleFavorite}
        />
      )}
      contentContainerStyle={styles.listContent}
    />
  );
};

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
