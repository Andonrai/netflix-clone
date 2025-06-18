import useFavorites from "@/hooks/useFavorites";
import { FaCheck, FaPlus, FaSpinner } from "react-icons/fa";

interface FavoriteButtonProps {
  movieId: string;
}

export default function FavoriteButton({ movieId }: FavoriteButtonProps) {
  const { addFavorite, isAdding, removeFavorite, isRemoving, favorites } =
    useFavorites();

  const isFavorite = favorites.some((fav) => fav.id === movieId);

  const toggleFavorites = () => {
    if (isFavorite) {
      removeFavorite(movieId);
    } else {
      addFavorite(movieId);
    }
  };

  const Icon = isFavorite ? FaCheck : FaPlus;

  return (
    <div
      onClick={toggleFavorites}
      className="cursor-pointer group/item size-6 lg:size-10 border-2 border-white rounded-full flex items-center justify-center transition hover:border-neutral-300"
    >
      {isAdding || isRemoving ? <FaSpinner className="animate-spin"/> : <Icon />}
    </div>
  );
}
