"use client";
import { isEmpty } from "lodash";
import MovieCard from "./movie-card";
import { Movie } from "@/types/movie";

interface MovieListProps {
  data: Movie[];
  title: string;
}

export default function MovieList({ data, title }: MovieListProps) {
  if (isEmpty(data)) return null;

  return <div className="px-4 md:px-12 mt-4 space-y-8">
    <div>
        <p className="text-md md:text-xl lg:text-2xl font-semibold mb-4">{title}</p>
        <div className="grid grid-cols-4 gap-2">
            {data.map((movie) => (
                <MovieCard key={movie.id} data={movie} />
            ))}
        </div>
    </div>
  </div>;
}
