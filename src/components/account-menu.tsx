import { signOut } from "@/lib/auth-client";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface AccountMenuProps {
  username?: string;
  visible?: boolean;
}

export default function AccountMenu({ username, visible }: AccountMenuProps) {
  const router = useRouter();
  if (!visible) return null;

  const signOutButton = async () => {
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/auth");
        },
      },
    });
  };
  return (
    <div className="bg-black w-56 absolute top-14 right-0 py-5 flex-col border-2 border-gray-800 flex">
      <div className="flex flex-col gap-3">
        <div className="px-3 group/item flex flex-row gap-3 items-center w-full">
          <Image
            width={32}
            className="w-8 rounded-md"
            src="/images/default-blue.webp"
            alt="Profile"
          />
          <p className="text-sm group-hover/item:underline">{username}</p>
        </div>
        <hr className="bg-gray-600 border-0 h-px my-4" />
        <div
          onClick={signOutButton}
          className="px-3 text-center text-sm hover:underline"
        >
          Sign out of Netflix
        </div>
      </div>
    </div>
  );
}
