import { Movie } from "@/types/movie";
import { useQuery } from "@tanstack/react-query";

const useMovie = (id: string) => {
  const { isLoading, error, data } = useQuery<Movie, Error>({
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    queryKey: ["movie", id],
    queryFn: () => fetch(`/api/movies/${id}`).then((res) => res.json()),
    enabled: !!id,
  });

  return {
    data,
    error,
    isLoading,
  };
};

export default useMovie;
