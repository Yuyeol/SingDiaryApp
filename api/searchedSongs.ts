import axiosInstance from "@/api/axios";
import { KySongResponse, TjSongResponse } from "@/types/songs";

async function getSearchedSongs(
  brand: string,
  category: string,
  searchTerm: string
) {
  const { data } = await axiosInstance.get(
    `/all-songs/${brand}/search?${category}=${searchTerm}`
  );
  return brand === "tj" ? (data as TjSongResponse) : (data as KySongResponse);
}

export default getSearchedSongs;
