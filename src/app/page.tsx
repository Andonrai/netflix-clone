"use client";
import Billboard from "@/components/billboard";
import InfoModal from "@/components/info-modal";
import MovieList from "@/components/movie-list";
import Navbar from "@/components/navbar";
import useFavorites from "@/hooks/useFavorites";
import { useInfoModal } from "@/hooks/useInfoModal";
import useMovieList from "@/hooks/useMovieList";

export default function Home() {
  const { data: movies } = useMovieList();
  const { favorites } = useFavorites();

  const { isOpen, closeModal, movieId } = useInfoModal();

  return (
    <>
      {isOpen && movieId && <InfoModal visible={isOpen} onClose={closeModal} />}
      <Navbar />
      <Billboard />
      <div className="pb-40">
        <MovieList title="Trending Now" data={movies ?? []} />
        <MovieList title="My List" data={favorites ?? []} />
      </div>
    </>
  );
}
