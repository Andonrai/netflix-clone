import { Movie } from "@/types/movie";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

type AddFavoriteContext = {
  previousFavorites: Movie[];
};

type RemoveFavoriteContext = {
  previousFavorites: Movie[];
};

const useFavorites = () => {
  const queryClient = useQueryClient();

  const {
    data: favorites = [],
    isLoading: isFetchingFavorites,
    error: fetchError,
  } = useQuery<Movie[]>({
    queryKey: ["favorites"],
    queryFn: async () => {
      const res = await fetch("/api/favorites");
      if (!res.ok) throw new Error("Error getting favorites");
      return res.json();
    },
  });

  const addMutation = useMutation<void, Error, string, AddFavoriteContext>({
    mutationFn: async (movieId) => {
      const response = await fetch("/api/favorite", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ movieId }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error adding favorite");
      }
    },
    onMutate: async (movieId) => {
      await queryClient.cancelQueries({ queryKey: ["favorites"] });

      const previousFavorites =
        queryClient.getQueryData<Movie[]>(["favorites"]) || [];

      const allMovies = queryClient.getQueryData<Movie[]>(["movieList"]) || [];
      const movieToAdd = allMovies.find((movie) => movie.id === movieId);

      if (movieToAdd) {
        queryClient.setQueryData<Movie[]>(
          ["favorites"],
          [...previousFavorites, movieToAdd]
        );
      }

      toast.success("Added to favorite");
      return { previousFavorites };
    },
    onError: (error, _, context) => {
      if (context?.previousFavorites) {
        queryClient.setQueryData<Movie[]>(
          ["favorites"],
          context.previousFavorites
        );
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
    },
  });

  const removeMutation = useMutation<
    void,
    Error,
    string,
    RemoveFavoriteContext
  >({
    mutationFn: async (movieId) => {
      const response = await fetch("/api/favorite", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ movieId }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete favorite");
      }
    },
    onMutate: async (movieId) => {
      await queryClient.cancelQueries({ queryKey: ["favorites"] });

      const previousFavorites =
        queryClient.getQueryData<Movie[]>(["favorites"]) || [];

      const newFavorites = previousFavorites.filter(
        (movie) => movie.id !== movieId
      );
      queryClient.setQueryData<Movie[]>(["favorites"], newFavorites);

      toast.success("Removed from favorites");
      return { previousFavorites };
    },
    onError: (error, movieId, context) => {
      console.error("Error deleting favorite:", error.message);

      if (context?.previousFavorites) {
        queryClient.setQueryData<Movie[]>(
          ["favorites"],
          context.previousFavorites
        );
      }

      toast.error(error.message);
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["favorites"],
        refetchType: "active",
      });
    },
  });

  return {
    favorites,
    isFetchingFavorites,
    fetchError,
    addFavorite: addMutation.mutate,
    removeFavorite: removeMutation.mutate,
    isAdding: addMutation.isPending,
    isRemoving: removeMutation.isPending,
    addError: addMutation.error,
    removeError: removeMutation.error,
  };
};

export default useFavorites;
