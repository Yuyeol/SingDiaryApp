import getPopularSongs from "@/api/popularSongs";
import { useQuery } from "@tanstack/react-query";

const usePopularSongs = (brand: string) => {
  return useQuery({
    queryKey: ["popularSongs", brand],
    queryFn: () => getPopularSongs(brand),
  });
};

export default usePopularSongs;
