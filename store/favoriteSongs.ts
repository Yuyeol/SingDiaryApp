import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { Song } from "@/types/songs";
import { PopularSong } from "@/types/popularSongs";
import { Brand } from "@/types";

const FAVORITE_SONGS_KEY = "@SingDiary:FavoriteSongs";

export type FavoriteSong = (Song | PopularSong) & {
  isFavorite: boolean;
  vocalGender?: string;
  vocalKey?: string;
  memo?: string;
  brand: Brand;
};

interface FavoriteSongsState {
  favoriteSongs: FavoriteSong[];
  isLoading: boolean;
  getIsFavoriteSong: (id: number) => boolean;
  toggleFavoriteSong: (
    song: Song | PopularSong,
    brand: Brand
  ) => Promise<FavoriteSong[]>;
  updateSongInfo: (
    songId: number,
    songInfo: { vocalGender?: string; vocalKey?: string; memo?: string }
  ) => Promise<FavoriteSong[]>;
}

const useFavoriteSongsStore = create<FavoriteSongsState>()(
  persist(
    (set, get) => ({
      favoriteSongs: [],
      isLoading: true,

      getIsFavoriteSong: (id: number) => {
        return get().favoriteSongs.some((song) => song.id === id);
      },

      toggleFavoriteSong: async (song, brand) => {
        try {
          const { favoriteSongs, getIsFavoriteSong } = get();
          let updatedFavoriteSongs: FavoriteSong[];

          if (getIsFavoriteSong(song.id)) {
            updatedFavoriteSongs = favoriteSongs.filter(
              (s) => s.id !== song.id
            );
          } else {
            const favoriteSong: FavoriteSong = {
              ...song,
              isFavorite: true,
              brand,
            };
            updatedFavoriteSongs = [...favoriteSongs, favoriteSong];
          }

          set({ favoriteSongs: updatedFavoriteSongs });
          return updatedFavoriteSongs;
        } catch (error) {
          console.error("Failed to toggle favorite song:", error);
          return get().favoriteSongs;
        }
      },

      updateSongInfo: async (
        songId: number,
        songInfo: { vocalGender?: string; vocalKey?: string; memo?: string }
      ) => {
        try {
          const { favoriteSongs, getIsFavoriteSong } = get();

          if (!getIsFavoriteSong(songId)) {
            throw new Error("노래가 즐겨찾기에 추가되어 있지 않습니다.");
          }

          const updatedFavoriteSongs = favoriteSongs.map((song) => {
            if (song.id === songId) {
              return { ...song, ...songInfo };
            }
            return song;
          });

          set({ favoriteSongs: updatedFavoriteSongs });
          return updatedFavoriteSongs;
        } catch (error) {
          console.error("Failed to update song info:", error);
          throw error;
        }
      },
    }),
    {
      name: FAVORITE_SONGS_KEY,
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ favoriteSongs: state.favoriteSongs }),
      onRehydrateStorage: () => (state) => {
        useFavoriteSongsStore.setState({ isLoading: false });
      },
    }
  )
);

export default useFavoriteSongsStore;
