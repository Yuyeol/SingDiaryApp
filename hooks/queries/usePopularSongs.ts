import getPopularSongs from "@/api/popularSongs";
import { useQuery } from "@tanstack/react-query";

const usePopularSongs = (karaokeType: string) => {
  return useQuery({
    queryKey: ["popularSongs", karaokeType],
    queryFn: () => getPopularSongs(karaokeType),
  });
};

export default usePopularSongs;
