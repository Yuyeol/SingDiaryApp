import React, { useState, useCallback } from "react";
import { View, StyleSheet, SafeAreaView } from "react-native";
import { StatusBar } from "expo-status-bar";
import KaraokeTypeToggle from "@/components/KaraokeToggle";
import SongList from "@/components/SongList/SongList";
import { Song } from "@/components/SongList/SongItem";

type KaraokeType = "TJ" | "금영";

// 임시 데이터
const MOCK_TJ_SONGS: Song[] = [
  {
    id: "1",
    number: "12345",
    title: "사랑은 늘 도망가",
    artist: "임영웅",
    isFavorite: false,
  },
  {
    id: "2",
    number: "98765",
    title: "신호등",
    artist: "이무진",
    isFavorite: true,
  },
  {
    id: "3",
    number: "45678",
    title: "라일락",
    artist: "IU",
    isFavorite: false,
  },
  {
    id: "4",
    number: "87456",
    title: "낙하 (with 아이유)",
    artist: "AKMU",
    isFavorite: false,
  },
  {
    id: "5",
    number: "65432",
    title: "Next Level",
    artist: "aespa",
    isFavorite: true,
  },
  {
    id: "6",
    number: "23456",
    title: "Butter",
    artist: "BTS",
    isFavorite: false,
  },
  {
    id: "7",
    number: "78901",
    title: "롤린 (Rollin')",
    artist: "브레이브걸스",
    isFavorite: false,
  },
  {
    id: "8",
    number: "34567",
    title: "허리춤",
    artist: "송가인",
    isFavorite: true,
  },
  {
    id: "9",
    number: "67890",
    title: "헤픈 우연",
    artist: "헤이즈",
    isFavorite: false,
  },
  {
    id: "10",
    number: "43210",
    title: "서랍",
    artist: "10CM",
    isFavorite: false,
  },
];

const MOCK_KUMYOUNG_SONGS: Song[] = [
  {
    id: "11",
    number: "54321",
    title: "멜로디",
    artist: "ASH ISLAND",
    isFavorite: true,
  },
  {
    id: "12",
    number: "67890",
    title: "나는 나비",
    artist: "전영록",
    isFavorite: false,
  },
  {
    id: "13",
    number: "12543",
    title: "문득",
    artist: "비비(BIBI)",
    isFavorite: false,
  },
  {
    id: "14",
    number: "57531",
    title: "Weekend",
    artist: "태연 (TAEYEON)",
    isFavorite: false,
  },
  {
    id: "15",
    number: "86421",
    title: "밤하늘의 별을 (2020)",
    artist: "경서",
    isFavorite: true,
  },
  {
    id: "16",
    number: "97531",
    title: "나랑 같이 걸을래 (Feel My Rhythm)",
    artist: "Red Velvet",
    isFavorite: false,
  },
  {
    id: "17",
    number: "15678",
    title: "호랑수월가",
    artist: "탑현",
    isFavorite: false,
  },
  {
    id: "18",
    number: "35791",
    title: "회전목마 (Feat. Zion.T, 원슈타인)",
    artist: "sokodomo",
    isFavorite: true,
  },
  {
    id: "19",
    number: "96428",
    title: "리무진 (Feat. MINO)",
    artist: "BE'O",
    isFavorite: false,
  },
  {
    id: "20",
    number: "75319",
    title: "드라마",
    artist: "이문세",
    isFavorite: false,
  },
];

export default function PopularScreen() {
  const [karaokeType, setKaraokeType] = useState<KaraokeType>("TJ");
  const [songs, setSongs] = useState<Song[]>(() =>
    karaokeType === "TJ" ? MOCK_TJ_SONGS : MOCK_KUMYOUNG_SONGS
  );
  const [loading, setLoading] = useState(false);

  const handleTypeChange = useCallback((type: KaraokeType) => {
    setKaraokeType(type);
    setLoading(true);

    // 실제로는 API 호출이겠지만, 여기서는 setTimeout으로 로딩 상태 구현
    setTimeout(() => {
      setSongs(type === "TJ" ? MOCK_TJ_SONGS : MOCK_KUMYOUNG_SONGS);
      setLoading(false);
    }, 500);
  }, []);

  const handlePressSong = useCallback((song: Song) => {
    // 노래 선택 시 수행할 동작 (상세 페이지로 이동 등)
    console.log("Selected song:", song);
  }, []);

  const handleToggleFavorite = useCallback((id: string) => {
    setSongs((prevSongs) =>
      prevSongs.map((song) =>
        song.id === id ? { ...song, isFavorite: !song.isFavorite } : song
      )
    );
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <KaraokeTypeToggle
          selectedType={karaokeType}
          onTypeChange={handleTypeChange}
        />
        <SongList
          songs={songs}
          loading={loading}
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
});
