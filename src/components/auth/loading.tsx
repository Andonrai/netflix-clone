"use client";

import { useSession } from "@/lib/auth-client";

export function AuthLoading({ children }: { children: React.ReactNode }) {
  const { isPending } = useSession();

  return isPending ? children : null;
}
