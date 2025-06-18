import { useQuery } from "@tanstack/react-query";

const useFavorites = () => {
  const { isLoading, error, data } = useQuery<string[], Error>({
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    queryKey: ["favoritesMovie"],
    queryFn: () => fetch("/api/favorites").then((res) => res.json()),
  });

  return {
    data,
    error,
    isLoading,
  };
};

export default useFavorites;
