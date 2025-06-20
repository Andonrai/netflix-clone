"use client";
import useBillboard from "@/hooks/useBillboard";
import { Info } from "lucide-react";
import PlayButton from "./play-button";
import { useCallback } from "react";
import { useInfoModal } from "@/hooks/useInfoModal";

export default function Billboard() {
  const { data } = useBillboard();
  const { openModal } = useInfoModal();

  const handleOpenModal = useCallback(() => {
    if (!data || !data.id) return;
    openModal(data.id);
  }, [openModal, data]);

  return (
    <div className="relative h-[56.25vw]">
      <video
        className="w-full h-[56.25vw] object-cover brightness-[60%]"
        autoPlay
        muted
        loop
        poster={data?.thumbnailUrl}
        src={data?.videoUrl}
      ></video>
      <div className="absolute top-[30%] md:top-[40%] ml-4 md:ml-16">
        <p className="text-xl md:text-5xl h-full w-[50%] lg:text-6xl font-bold drop-shadow-xl">
          {data?.title}
        </p>
        <p className="text-[8px] md:text-lg mt-3 md:mt-8 w-[90%] md:w-[80%] lg:w-[50%] drop-shadow-xl">
          {data?.description}
        </p>
        <div className="flex flex-row items-center mt-3 md:mt-4 gap-3">
          {data?.id && <PlayButton movieId={data.id} />}
          <button
            onClick={handleOpenModal}
            className="bg-white/30 rounded-md py-1 md:py-2 px-2 md:px-4 w-auto text-xs lg:text-lg font-semibold flex flex-row items-center hover:bg-white/20 transition-colors"
          >
            <Info className="mr-1" /> More Info
          </button>
        </div>
      </div>
    </div>
  );
}
