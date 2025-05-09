import getSearchedSongs from "@/api/searchedSongs";
import { useQuery } from "@tanstack/react-query";

const useSearchedSongs = (
  brand: string,
  category: string,
  searchTerm: string
) => {
  return useQuery({
    queryKey: ["searchedSongs", brand, category, searchTerm],
    queryFn: () => getSearchedSongs(brand, category, searchTerm),
    enabled: false,
  });
};

export default useSearchedSongs;
