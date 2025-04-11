import React, {
  useState,
  useCallback,
  useEffect,
  useRef,
  useMemo,
} from "react";
import { SafeAreaView, View, StyleSheet } from "react-native";
import KaraokeToggle from "@/components/KaraokeToggle";
import SearchBar from "@/components/SearchBar";
import { KaraokeType, SearchCategory } from "@/app/types";
import useSearchedSongs from "@/hooks/queries/useSearchedSongs";
import SongList from "@/components/SongList/SongList";
import { debounce } from "lodash";

export default function HomeScreen() {
  const [karaokeType, setKaraokeType] = useState<KaraokeType>("tj");
  const [searchCategory, setSearchCategory] = useState<SearchCategory>("title");
  const [searchTerm, setSearchTerm] = useState("");

  const { data, isLoading, isError, refetch } = useSearchedSongs(
    karaokeType,
    searchCategory,
    searchTerm
  );
  const searchedSongs = searchCategory === "title" ? data?.title : data?.singer;

  // 디바운스 함수 생성 및 유지
  const debouncedRefetch = useMemo(
    () =>
      debounce(() => {
        if (searchTerm.trim()) refetch();
      }, 1000),
    [searchTerm]
  );

  // 검색어 변경 핸들러
  const handleSearchTermChange = (text: string) => {
    setSearchTerm(text);
    debouncedRefetch();
  };

  const handleTypeChange = (type: KaraokeType) => {
    setKaraokeType(type);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <KaraokeToggle
          selectedType={karaokeType}
          onTypeChange={handleTypeChange}
        />

        <SearchBar
          value={searchTerm}
          onChangeText={handleSearchTermChange}
          category={searchCategory}
          onCategoryChange={setSearchCategory}
        />

        <SongList
          songs={searchedSongs}
          onPressSong={() => {}}
          onToggleFavorite={() => {}}
          isLoading={isLoading}
          isError={isError}
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
