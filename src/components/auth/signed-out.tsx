"use client";

import { useSession } from "@/lib/auth-client";

export function SignedOut({ children }: { children: React.ReactNode }) {
  const { data, isPending } = useSession();

  return !data && !isPending ? children : null;
}
