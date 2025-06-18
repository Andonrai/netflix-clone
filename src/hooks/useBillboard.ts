import { useQuery } from "@tanstack/react-query";

interface Movie {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl: string;
  genre: string;
  duration: string;
}

const useBillboard = () => {
  const { isPending, isLoading, error, data } = useQuery<Movie, Error>({
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    queryKey: ["billboardData"],
    queryFn: () => fetch("/api/random").then((res) => res.json()),
  });

  return {
    data,
    error,
    isPending,
    isLoading,
  };
};

export default useBillboard;
