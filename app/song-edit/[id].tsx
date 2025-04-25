import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  SafeAreaView,
  Alert,
} from "react-native";
import { useLocalSearchParams, Stack, useRouter } from "expo-router";
import { useFavoriteSongs } from "@/hooks/useFavoriteSongs";
import { FavoriteSong } from "@/hooks/useFavoriteSongs";
export default function SongEditScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { favoriteSongs, updateSongInfo } = useFavoriteSongs();
  const [song, setSong] = useState<FavoriteSong | null>(null);
  const [vocalGender, setVocalGender] = useState<string>("남");
  const [vocalKey, setVocalKey] = useState<string>("0");
  const [memo, setMemo] = useState<string>("");

  useEffect(() => {
    if (id && favoriteSongs) {
      const foundSong = favoriteSongs.find((song) => song.id.toString() === id);
      if (foundSong) {
        setSong(foundSong);
        // 기존 값으로 폼 초기화
        setVocalGender(foundSong.vocalGender || "남");
        setVocalKey(foundSong.vocalKey || "0");
        setMemo(foundSong.memo || "");
      }
    }
  }, [id, favoriteSongs]);

  const keyOptions = [
    "-5",
    "-4",
    "-3",
    "-2",
    "-1",
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
  ];

  const handleSave = async () => {
    if (!song) return;

    try {
      await updateSongInfo(song.id, {
        vocalGender,
        vocalKey,
        memo,
      });
      router.back();
    } catch (error) {
      Alert.alert("저장 실패", "노래 정보를 저장하는데 실패했습니다.");
    }
  };

  if (!song) {
    return (
      <SafeAreaView style={styles.container}>
        <Stack.Screen
          options={{
            title: "노래 정보 편집",
            headerBackTitle: "취소",
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
          title: "노래 정보 편집",
          headerBackTitle: "취소",
          headerRight: () => (
            <TouchableOpacity onPress={handleSave}>
              <Text style={styles.saveButtonText}>저장</Text>
            </TouchableOpacity>
          ),
        }}
      />

      <ScrollView style={styles.scrollView}>
        <View style={styles.songHeader}>
          <Text style={styles.songTitle}>{song.title}</Text>
          <Text style={styles.songArtist}>{song.singer}</Text>
        </View>

        {/* 성별 선택 */}
        <Text style={styles.sectionTitle}>성별</Text>
        <View style={styles.genderTabContainer}>
          <TouchableOpacity
            style={[
              styles.genderTab,
              vocalGender === "남" && styles.activeGenderTab,
            ]}
            onPress={() => setVocalGender("남")}
          >
            <Text
              style={[
                styles.genderTabText,
                vocalGender === "남" && styles.activeTabText,
              ]}
            >
              남
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.genderTab,
              vocalGender === "여" && styles.activeGenderTab,
            ]}
            onPress={() => setVocalGender("여")}
          >
            <Text
              style={[
                styles.genderTabText,
                vocalGender === "여" && styles.activeTabText,
              ]}
            >
              여
            </Text>
          </TouchableOpacity>
        </View>

        {/* 키 선택 */}
        <Text style={styles.sectionTitle}>키</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.keyTabScrollContainer}
        >
          {keyOptions.map((key) => (
            <TouchableOpacity
              key={key}
              style={[styles.keyTab, vocalKey === key && styles.activeKeyTab]}
              onPress={() => setVocalKey(key)}
            >
              <Text
                style={[
                  styles.keyTabText,
                  vocalKey === key && styles.activeTabText,
                ]}
              >
                {key}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* 메모 입력 */}
        <Text style={styles.sectionTitle}>메모</Text>
        <TextInput
          style={styles.memoInput}
          multiline
          numberOfLines={4}
          placeholder="노래에 대한 메모를 입력하세요"
          value={memo}
          onChangeText={setMemo}
        />
      </ScrollView>
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
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  songArtist: {
    fontSize: 18,
    color: "#555",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 20,
    marginBottom: 12,
    color: "#333",
  },
  genderTabContainer: {
    flexDirection: "row",
    marginBottom: 15,
  },
  genderTab: {
    flex: 1,
    padding: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
  },
  activeGenderTab: {
    backgroundColor: "#FF6B57",
    borderColor: "#FF6B57",
  },
  genderTabText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#555",
  },
  keyTabScrollContainer: {
    paddingVertical: 10,
  },
  keyTab: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginRight: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 20,
  },
  activeKeyTab: {
    backgroundColor: "#FF6B57",
    borderColor: "#FF6B57",
  },
  keyTabText: {
    fontSize: 16,
    color: "#555",
  },
  activeTabText: {
    color: "white",
    fontWeight: "bold",
  },
  memoInput: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    minHeight: 120,
    textAlignVertical: "top",
    marginTop: 8,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FF6B57",
  },
});
