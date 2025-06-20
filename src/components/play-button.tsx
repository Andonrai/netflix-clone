import { useRouter } from "next/navigation";
import { FaPlay } from "react-icons/fa";

interface PlayButtonProps {
  movieId: string;
}

export default function PlayButton({ movieId }: PlayButtonProps) {
  const router = useRouter();
  return (
    <button onClick={() => router.push(`/watch/${movieId}`)} className="bg-white rounded-md py-1 md:py-2 px-2 md:px-4 w-auto text-xs lg:text-lg font-semibold flex flex-row items-center hover:bg-neutral-300 transition-colors text-black">
      <FaPlay className="mr-1" /> Play
    </button>
  );
}
