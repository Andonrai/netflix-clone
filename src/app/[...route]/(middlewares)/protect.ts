import { createMiddleware } from "hono/factory";
import { auth, AuthType } from "@/lib/auth";

export const protect = createMiddleware<AuthType>(async (c, next) => {
  const session = await auth.api.getSession({ headers: c.req.raw.headers });

  if (!session || !session.user) {
    return c.json(
      {
        success: false,
        message: "Unauthorized",
        error: "No valid session found",
      },
      401
    );
  }

  c.set("user", session.user);
  c.set("session", session.session);

  await next();
});