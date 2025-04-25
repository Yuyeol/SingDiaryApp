import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import HeartButton from "@/components/common/HeartButton";
import { PopularSong } from "@/app/types/popularSongs";
import { Song } from "@/app/types/songs";
import { colors } from "@/constants";

interface Props<T> {
  song: T;
  onToggleFavorite: (id: number) => void;
  showRank?: boolean;
  isFavorite?: boolean;
  onPress?: (song: T) => void;
}

function SongItem<T extends Song | PopularSong>({
  song,
  onToggleFavorite,
  isFavorite = false,
  onPress,
}: Props<T>) {
  if (!song) {
    return null;
  }

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => onPress && onPress(song)}
    >
      <View style={styles.songInfo}>
        <Text style={styles.number}>{song.number}</Text>
        <View style={styles.songInfoCol}>
          <Text style={styles.title} numberOfLines={1}>
            {song.title}
          </Text>
          <Text style={styles.artist} numberOfLines={1}>
            {song.singer}
          </Text>
        </View>
      </View>
      <HeartButton
        isFavorite={isFavorite}
        onToggle={() => onToggleFavorite(song.id)}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  rank: {
    width: 30,
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  songInfo: {
    flex: 1,
    marginLeft: 8,
    marginRight: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  number: {
    fontSize: 16,
    color: colors.BLACK,
    fontWeight: "bold",
    width: 54,
  },
  songInfoCol: { flex: 1 },
  title: {
    flex: 1,
    fontSize: 15,
    fontWeight: "600",
    color: "#000",
    marginRight: 8,
  },

  artist: {
    fontSize: 13,
    color: "#666",
  },
});

export default SongItem;
