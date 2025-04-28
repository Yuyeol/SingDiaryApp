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
import { colors } from "@/constants";
import SongInfo from "@/components/FavoriteSong/SongInfo";
import SongMemo from "@/components/FavoriteSong/SongMemo";
import WideButton from "@/components/common/WideButton";

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
      <View style={styles.infoContainer}>
        <SongInfo song={song} />
        {song.vocalGender || song.vocalKey || song.memo ? (
          <>
            <View style={styles.memoContainer}>
              <SongMemo
                vocalGender={song.vocalGender}
                vocalKey={song.vocalKey}
                memo={song.memo}
              />
            </View>
            <WideButton
              icon={<AntDesign name="edit" size={20} color="white" />}
              label="편집"
              onPress={handleEditPress}
            />
          </>
        ) : (
          <View style={[styles.memoContainer]}>
            <View style={styles.noMemoTextContainer}>
              <AntDesign name="edit" size={40} color={colors.GRAY_500} />
              <Text style={styles.noMemoText}>연습 하고 있는</Text>
              <Text style={styles.noMemoText}> 음정과 감각을</Text>
              <Text style={styles.noMemoText}>기록해보세요.</Text>
            </View>
            <WideButton label="메모하기" onPress={handleEditPress} />
          </View>
        )}
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
  memoContainer: {
    marginTop: 16,
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: colors.ORANGE_600,
    backgroundColor: colors.WHITE,
    borderRadius: 12,
    flex: 1,
  },
  noMemoTextContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    marginBottom: 16,
  },
  noMemoText: {
    fontSize: 16,
    color: colors.GRAY_500,
    fontWeight: "500",
    textAlign: "center",
  },
});
