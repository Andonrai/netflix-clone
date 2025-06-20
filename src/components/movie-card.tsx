import { FaPlay } from "react-icons/fa";
import FavoriteButton from "./favorite-button";
import { useRouter } from "next/navigation";
import { useInfoModal } from "@/hooks/useInfoModal";
import { ChevronDown } from "lucide-react";
import { Movie } from "@/types/movie";
import Image from "next/image";

interface MovieCardProps {
  data: Movie;
}

export default function MovieCard({ data }: MovieCardProps) {
  const router = useRouter();
  const { openModal } = useInfoModal();

  return (
    <div className="group bg-zinc-900 col-span relative h-[12vw]">
      <div className="relative w-full h-[12vw]">
        <Image
          src={data.thumbnailUrl}
          alt="Thumbnail"
          fill
          className="cursor-pointer object-cover transition duration-75 shadow-xl rounded-md group-hover:opacity-90 sm:group-hover:opacity-0 delay-300"
          sizes="100vw"
        />
      </div>
      <div className="opacity-0 absolute top-0 transition duration-200 z-10 invisible sm:visible delay-300 w-full scale-0 group-hover:scale-110 group-hover:-translate-y-[6vw] group-hover:translate-x-[2vw] group-hover:opacity-100">
        <div className="relative w-full h-[12vw]">
          <Image
            className="cursor-pointer object-cover transition duration-75 shadow-xl rounded-t-md"
            src={data.thumbnailUrl}
            alt="Thumbnail"
            fill
            sizes="100vw"
          />
        </div>
        <div className="z-10 bg-zinc-800 p-2 lg:p-4 absolute w-full transition shadow-md rounded-b-md ">
          <div className="flex flex-row items-center gap-3">
            <div
              className="cursor-pointer size-6 lg:size-10 bg-white rounded-full flex justify-center items-center transition hover:bg-neutral-300"
              onClick={() => router.push(`/watch/${data.id}`)}
            >
              <FaPlay className="text-black " />
            </div>
            <FavoriteButton movieId={data.id} />
            <div
              onClick={() => openModal(data.id)}
              className="cursor-pointer ml-auto group/item size-6 lg:size-10 border-white border-2 rounded-full flex justify-center items-center transition hover:border-neutral-300"
            >
              <ChevronDown className="group-hover/item:text-neutral-300" />
            </div>
          </div>
          <p className="text-green-400 font-semibold mt-4">
            New <span className="text-white">2025</span>
          </p>
          <div className="flex flex-row mt-4 gap-2 items-center">
            <p className="text-[10px] lg:text-sm">{data.duration}</p>
          </div>
          <div className="flex flex-row mt-4 gap-2 items-center">
            <p className="text-[10px] lg:text-sm">{data.genre}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
