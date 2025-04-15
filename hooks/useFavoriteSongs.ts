import { useState, useEffect, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Song } from "@/app/types/songs";
import { PopularSong } from "@/app/types/popularSongs";

type FavoriteSong = (Song | PopularSong) & { isFavorite: boolean };

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

  useEffect(() => {
    loadFavoriteSongs();
  }, [loadFavoriteSongs]);

  return {
    favoriteSongs,
    isLoading,
    getIsFavoriteSong,
    toggleFavoriteSong,
  };
};
