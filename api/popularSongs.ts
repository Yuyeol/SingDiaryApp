import axiosInstance from "@/api/axios";
import {
  TjPopularSongResponse,
  KyPopularSongResponse,
} from "@/app/types/popularSongs";

async function getPopularSongs(brand: string) {
  const { data } = await axiosInstance.get(`/popular-songs/${brand}`);
  return brand === "tj"
    ? (data as TjPopularSongResponse)
    : (data as KyPopularSongResponse);
}

export default getPopularSongs;
