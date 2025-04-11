import axiosInstance from "@/api/axios";
import {
  TjPopularSongResponse,
  KyPopularSongResponse,
} from "@/app/types/popularSongs";

async function getPopularSongs(karaokeType: string) {
  const { data } = await axiosInstance.get(`/popular-songs/${karaokeType}`);
  return karaokeType === "tj"
    ? (data as TjPopularSongResponse)
    : (data as KyPopularSongResponse);
}

export default getPopularSongs;
