import { Movie } from "@/types/movie";
import { useQuery } from "@tanstack/react-query";

const useMovieList = () => {
  const { isPending, isLoading, error, data } = useQuery<Movie[], Error>({
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    queryKey: ["movieList"],
    queryFn: () => fetch("/api/movies").then((res) => res.json()),
  });

  return {
    data,
    error,
    isLoading,
  };
};

export default useMovieList;
