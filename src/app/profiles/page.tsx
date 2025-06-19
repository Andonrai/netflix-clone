"use client";

import { useSession } from "@/lib/auth-client";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Profiles() {
  const router = useRouter();
  const { data } = useSession();

  return (
    <div className="flex items-center h-full justify-center">
      <div className="flex flex-col">
        <h1 className="text-3xl md:text-6xl text-center">Who is watching</h1>
        <div className="fklex items-center justify-center gap-8 mt-10">
          <div onClick={() => router.push("/")}>
            <div className="group flex-row w-44 mx-auto">
              <div className="size-44 rounded-md flex items-center justift-center border-transparent group-hover:cursor-pointer group-hover:border group-hover:border-white overflow-hidden">
                <Image src="/images/default-blue.webp" alt="Profile" />
              </div>
              <div className="mt-4 text-gray-400 text-2xl text-center group-hover:text-white">
                {data?.user.name}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
