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
import useFavoriteSongsStore, { FavoriteSong } from "@/store/favoriteSongs";
import SongInfo from "@/components/FavoriteSong/SongInfo";
import { colors } from "@/constants";
import WideButton from "@/components/common/WideButton";

export default function SongEditScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const favoriteSongs = useFavoriteSongsStore((state) => state.favoriteSongs);
  const updateSongInfo = useFavoriteSongsStore((state) => state.updateSongInfo);
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
            title: "메모 편집",
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
          title: "메모 편집",
          headerBackTitle: "취소",
        }}
      />

      <View style={styles.infoContainer}>
        <SongInfo song={song} />

        {/* 성별 선택 */}
        <Text style={styles.title}>성별</Text>
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
        <Text style={styles.title}>키</Text>
        <View>
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
        </View>

        <Text style={styles.title}>메모</Text>
        <TextInput
          style={styles.memoInput}
          multiline
          textAlignVertical="top"
          placeholder="연습 하고 있는 음정과 감각을 기록해보세요."
          value={memo}
          onChangeText={setMemo}
        />
        <WideButton label="저장" onPress={handleSave} />
      </View>
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

  infoContainer: {
    padding: 16,
    paddingTop: 24,
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 20,
    marginBottom: 12,
    color: "#333",
  },
  genderTabContainer: {
    flexDirection: "row",
    marginBottom: 15,
    gap: 8,
  },
  genderTab: {
    flex: 1,
    padding: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
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
    paddingBottom: 10,
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
    flex: 1,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    minHeight: 150, // 최소 높이 설정
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FF6B57",
  },
  editButton: {
    marginTop: 16,
    backgroundColor: colors.ORANGE_600,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
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
