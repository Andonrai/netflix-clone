"use client";
import { useInfoModal } from "@/hooks/useInfoModal";
import useMovie from "@/hooks/useMovie";
import { useCallback, useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import PlayButton from "./play-button";
import FavoriteButton from "./favorite-button";

interface InfoModalProps {
  visible?: boolean;
  onClose: () => void;
}

export default function InfoModal({ visible, onClose }: InfoModalProps) {
  const [isVisible, setIsVisible] = useState(!!visible);

  const { movieId } = useInfoModal();
  const { data } = useMovie(movieId ?? "");

  useEffect(() => {
    setIsVisible(!!visible);
  }, [visible]);

  const handleClose = useCallback(() => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [onClose]);

  if (!visible || !movieId) return null;

  return (
    <div className="z-50 transition duration-300 bg-black/80 flex items-center justify-center overflow-x-hidden overflow-y-auto fixed inset-0">
      <div className="relative w-auto mx-auto max-w-3xl rounded-md overflow-hidden">
        <div
          className={`${
            isVisible ? "scale-100" : "scale-0"
          } transform duration-300 relative flex-auto bg-zinc-900 drop-shadow-md`}
        >
          <div className="relative h-96">
            <video
              className="w-full brightness-[50%] object-cover h-full"
              autoPlay
              muted
              loop
              poster={data?.thumbnailUrl}
              src={data?.videoUrl}
            ></video>
            <div
              className="cursor-pointer absolute top-3 right-3 size-10 rounded-full bg-black/70 flex items-center justify-center"
              onClick={handleClose}
            >
              <IoClose className="text-white" />
            </div>
            <div className="absolute bottom-[10%] left-10">
              <p className="text-white text-3xl md:text-4xl h-full lg:text-5xl font-bold mb-8">
                {data?.title}
              </p>
              <div className="flex flex-row gap-4 items-center">
                {data && <PlayButton movieId={data.id} />}
                {data && <FavoriteButton movieId={data.id} />}
              </div>
            </div>
          </div>
          <div className="px-12 py-8">
            <p className="text-green-400 font-semibold text-lg">New</p>
            <p className="text-white text-lg">{data?.duration}</p>
            <p className="text-white text-lg">{data?.genre}</p>
            <p className="text-white text-lg">{data?.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
