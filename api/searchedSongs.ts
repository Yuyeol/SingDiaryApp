import axiosInstance from "@/api/axios";
import { KySongResponse, TjSongResponse } from "@/app/types/songs";

async function getSearchedSongs(
  karaokeType: string,
  category: string,
  searchTerm: string
) {
  const { data } = await axiosInstance.get(
    `/all-songs/${karaokeType}/search?${category}=${searchTerm}`
  );
  return karaokeType === "tj"
    ? (data as TjSongResponse)
    : (data as KySongResponse);
}

export default getSearchedSongs;
