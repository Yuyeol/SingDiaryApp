import React from "react";
import { FlatList, StyleSheet } from "react-native";
import SongItem from "@/components/SongList/SongItem";
import { PopularSong } from "@/app/types/popularSongs";

interface Props {
  songs: PopularSong[];
  onPressSong: (song: PopularSong) => void;
  onToggleFavorite: (id: number) => void;
}

const SongList = ({ songs, onPressSong, onToggleFavorite }: Props) => {
  return (
    <FlatList
      data={songs}
      keyExtractor={(item) => item.id.toString()}
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
});

export default SongList;
