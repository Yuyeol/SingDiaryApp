import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";
import {
  useLocalSearchParams,
  Stack,
  useRouter,
  useFocusEffect,
} from "expo-router";
import useFavoriteSongsStore from "@/store/favoriteSongs";
import { AntDesign } from "@expo/vector-icons";

export default function SongDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const favoriteSongs = useFavoriteSongsStore((state) => state.favoriteSongs);
  const [song, setSong] = useState<any>(null);

  // 화면이 포커스될 때마다 데이터 새로고침
  useFocusEffect(
    useCallback(() => {
      if (id && favoriteSongs) {
        const foundSong = favoriteSongs.find(
          (song) => song.id.toString() === id
        );
        if (foundSong) {
          setSong(foundSong);
        }
      }
    }, [id, favoriteSongs])
  );

  // 초기 로딩
  useEffect(() => {
    if (id && favoriteSongs) {
      const foundSong = favoriteSongs.find((song) => song.id.toString() === id);
      if (foundSong) {
        setSong(foundSong);
      }
    }
  }, [id, favoriteSongs]);

  const handleEditPress = () => {
    router.push({
      pathname: "/song-edit/[id]",
      params: { id },
    });
  };

  if (!song) {
    return (
      <SafeAreaView style={styles.container}>
        <Stack.Screen
          options={{
            title: "노래 상세",
            headerBackTitle: "뒤로",
          }}
        />
        <View style={styles.centerContainer}>
          <Text>노래를 찾을 수 없습니다.</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen
        options={{
          title: "노래 상세",
          headerBackTitle: "뒤로",
        }}
      />
      <ScrollView style={styles.scrollView}>
        <View style={styles.songHeader}>
          <Text style={styles.songTitle}>{song.title}</Text>
          <Text style={styles.songArtist}>{song.singer}</Text>
          <Text style={styles.songNumber}>노래번호: {song.number}</Text>
        </View>

        {(song.vocalGender || song.vocalKey || song.memo) && (
          <View style={styles.infoContainer}>
            <Text style={styles.sectionTitle}>내 노래 정보</Text>

            {song.vocalGender && (
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>성별:</Text>
                <Text style={styles.infoValue}>{song.vocalGender}</Text>
              </View>
            )}

            {song.vocalKey && (
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>키:</Text>
                <Text style={styles.infoValue}>{song.vocalKey}</Text>
              </View>
            )}

            {song.memo && (
              <View style={styles.memoContainer}>
                <Text style={styles.infoLabel}>메모:</Text>
                <Text style={styles.memoText}>{song.memo}</Text>
              </View>
            )}
          </View>
        )}
      </ScrollView>

      <TouchableOpacity style={styles.editButton} onPress={handleEditPress}>
        <AntDesign name="edit" size={20} color="white" />
        <Text style={styles.editButtonText}>편집</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  songHeader: {
    marginBottom: 24,
  },
  songTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  songArtist: {
    fontSize: 18,
    color: "#555",
    marginBottom: 8,
  },
  songNumber: {
    fontSize: 16,
    color: "#777",
  },
  infoContainer: {
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#333",
  },
  infoRow: {
    flexDirection: "row",
    marginBottom: 12,
    alignItems: "center",
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: "600",
    width: 60,
    color: "#555",
  },
  infoValue: {
    fontSize: 16,
    color: "#333",
  },
  memoContainer: {
    marginTop: 8,
  },
  memoText: {
    fontSize: 16,
    color: "#333",
    marginTop: 8,
    lineHeight: 24,
  },
  editButton: {
    position: "absolute",
    right: 20,
    bottom: 30,
    backgroundColor: "#FF6B57",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 30,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  editButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
    marginLeft: 8,
  },
});
