import getSearchedSongs from "@/api/searchedSongs";
import { useQuery } from "@tanstack/react-query";

const useSearchedSongs = (
  karaokeType: string,
  category: string,
  searchTerm: string
) => {
  return useQuery({
    queryKey: ["searchedSongs", karaokeType, category, searchTerm],
    queryFn: () => getSearchedSongs(karaokeType, category, searchTerm),
    enabled: false,
  });
};

export default useSearchedSongs;
