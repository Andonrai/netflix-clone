import { useSession } from "@/lib/auth-client";

export function SignedIn({ children }: { children: React.ReactNode }) {
  const { data } = useSession();

  return data ? children : null;
}
