"use client";
import useMovie from "@/hooks/useMovie";
import Link from "next/link";
import { useParams } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";

export default function MoviePage() {
  const params = useParams<{ movieId: string }>();
  const { data } = useMovie(params.movieId);

  return (
    <div className="h-screen w-screen bg-black">
      <nav className="fixed w-full p-4 z-10 flex flex-row items-center gap-8 bg-black/70">
        <Link href={"/"}><FaArrowLeft className="text-white" size={40} /></Link>
        <p className="text-xl md:text-3xl font-bold">
          <span className="font-light">Watching:</span>
          {data?.title}
        </p>
      </nav>
      <video autoPlay controls className="h-full w-full" src={data?.videoUrl}></video>
    </div>
  );
}
