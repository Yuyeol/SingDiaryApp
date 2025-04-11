import React from "react";
import { FlatList, StyleSheet } from "react-native";
import SongItem from "@/components/SongList/SongItem";
import { PopularSong } from "@/app/types/popularSongs";
import { Song } from "@/app/types/songs";

interface Props<T> {
  songs: T[];
  onPressSong: (song: T) => void;
  onToggleFavorite: (id: number) => void;
}

function SongList<T extends Song | PopularSong>({
  songs,
  onPressSong,
  onToggleFavorite,
}: Props<T>) {
  return (
    <FlatList
      data={songs}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <SongItem
          song={item}
          onPressSong={() => onPressSong(item)}
          onToggleFavorite={onToggleFavorite}
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
});

export default SongList;
