import axiosInstance from "@/api/axios";
import { TjSongResponse, KySongResponse } from "@/app/types/popularSongs";

async function getPopularSongs(karaokeType: string) {
  const { data } = await axiosInstance.get(`/popular-songs/${karaokeType}`);
  console.log(data);

  return karaokeType === "tj"
    ? (data as TjSongResponse)
    : (data as KySongResponse);
}

export default getPopularSongs;
