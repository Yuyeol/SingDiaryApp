import { useState, useEffect, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Song } from "@/app/types/songs";
import { PopularSong } from "@/app/types/popularSongs";

export type FavoriteSong = (Song | PopularSong) & {
  isFavorite: boolean;
  vocalGender?: string;
  vocalKey?: string;
  memo?: string;
};

const FAVORITE_SONGS_KEY = "@SingDiary:FavoriteSongs";

export const useFavoriteSongs = () => {
  const [favoriteSongs, setFavoriteSongs] = useState<FavoriteSong[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadFavoriteSongs = useCallback(async () => {
    try {
      setIsLoading(true);
      const jsonValue = await AsyncStorage.getItem(FAVORITE_SONGS_KEY);
      const storedSongs = jsonValue != null ? JSON.parse(jsonValue) : [];
      setFavoriteSongs(storedSongs);
    } catch (error) {
      console.error("Failed to load favorite songs:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const saveFavoriteSongs = useCallback(async (songs: FavoriteSong[]) => {
    try {
      const jsonValue = JSON.stringify(songs);
      await AsyncStorage.setItem(FAVORITE_SONGS_KEY, jsonValue);
    } catch (error) {
      console.error("Failed to save favorite songs:", error);
    }
  }, []);

  const getIsFavoriteSong = useCallback(
    (id: number) => {
      return favoriteSongs.some((song) => song.id === id);
    },
    [favoriteSongs]
  );

  const toggleFavoriteSong = useCallback(
    async (song: Song | PopularSong) => {
      try {
        let updatedFavoriteSongs: FavoriteSong[];

        if (getIsFavoriteSong(song.id)) {
          updatedFavoriteSongs = favoriteSongs.filter((s) => s.id !== song.id);
        } else {
          const favoriteSong: FavoriteSong = {
            ...song,
            isFavorite: true,
          };
          updatedFavoriteSongs = [...favoriteSongs, favoriteSong];
        }

        setFavoriteSongs(updatedFavoriteSongs);
        await saveFavoriteSongs(updatedFavoriteSongs);

        return updatedFavoriteSongs;
      } catch (error) {
        console.error("Failed to toggle favorite song:", error);
        return favoriteSongs;
      }
    },
    [favoriteSongs, getIsFavoriteSong, saveFavoriteSongs]
  );

  // 노래의 추가 정보 업데이트 함수
  const updateSongInfo = useCallback(
    async (
      songId: number,
      songInfo: { vocalGender?: string; vocalKey?: string; memo?: string }
    ) => {
      try {
        // 노래가 즐겨찾기에 있는지 확인
        if (!getIsFavoriteSong(songId)) {
          throw new Error("노래가 즐겨찾기에 추가되어 있지 않습니다.");
        }

        // 노래 정보 업데이트
        const updatedFavoriteSongs = favoriteSongs.map((song) => {
          if (song.id === songId) {
            return { ...song, ...songInfo };
          }
          return song;
        });

        // AsyncStorage에 먼저 저장
        const jsonValue = JSON.stringify(updatedFavoriteSongs);
        await AsyncStorage.setItem(FAVORITE_SONGS_KEY, jsonValue);

        // 그 다음 상태 업데이트
        setFavoriteSongs(updatedFavoriteSongs);

        return updatedFavoriteSongs;
      } catch (error) {
        console.error("Failed to update song info:", error);
        throw error; // 에러를 다시 던져서 UI에서 처리할 수 있도록 함
      }
    },
    [favoriteSongs, getIsFavoriteSong]
  );

  useEffect(() => {
    loadFavoriteSongs();
  }, [loadFavoriteSongs]);

  return {
    favoriteSongs,
    isLoading,
    getIsFavoriteSong,
    toggleFavoriteSong,
    updateSongInfo,
  };
};
