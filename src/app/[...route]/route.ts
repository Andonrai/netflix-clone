import { auth } from "@/lib/auth";
import { Hono } from "hono";
import { handle } from "hono/vercel";
import { protect } from "./(middlewares)/protect";
import { db } from "@/database";
import { movies, users } from "@/database/schema";
import { count, eq, inArray } from "drizzle-orm";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod/v4";

export const runtime = "nodejs";

const app = new Hono().basePath("/api");

app.all("/auth/*", async (c) => {
  return await auth.handler(c.req.raw);
});

app.get("/random", protect, async (c) => {
  const movieCount = await db.select({ count: count() }).from(movies);
  const randomIndex = Math.floor(Math.random() * movieCount[0].count);

  const randomMovies = await db
    .select()
    .from(movies)
    .limit(1)
    .offset(randomIndex);
  return c.json(randomMovies[0], 200);
});

app.get("/movies", protect, async (c) => {
  const moviesData = await db.select().from(movies);

  return c.json(moviesData, 200);
});

app.post(
  "/favorite",
  protect,
  zValidator(
    "json",
    z.object({
      movieId: z.uuid(),
    })
  ),
  async (c) => {
    const { movieId } = c.req.valid("json");
    const userData = c.get("user");

    const existingMovie = await db
      .select()
      .from(movies)
      .where(eq(movies.id, movieId));

    if (!existingMovie) {
      return c.json({ message: "Movie not found" }, 404);
    }

    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.id, userData?.id!));

    if (user.favoriteIds.includes(movieId)) {
      return c.json({ message: "Movie already in favorites" }, 400);
    }

    const newFavoriteIds = [...user.favoriteIds, movieId];

    const [updatedUser] = await db
      .update(users)
      .set({
        favoriteIds: newFavoriteIds,
      })
      .where(eq(users.id, userData?.id!))
      .returning({ favoriteIds: users.favoriteIds });

    return c.json(updatedUser, 200);
  }
);

app.delete(
  "/favorite",
  protect,
  zValidator(
    "json",
    z.object({
      movieId: z.uuid(),
    })
  ),
  async (c) => {
    const { movieId } = c.req.valid("json");
    const userData = c.get("user");
    const userId = userData?.id!;

    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.id, userId));

    if (!user) {
      return c.json({ message: "User not found" }, 404);
    }

    if (!user.favoriteIds.includes(movieId)) {
      return c.json({ success: true }, 200);
    }

    const updateFavoriteIds = user.favoriteIds.filter(id => id !== movieId);

    await db
      .update(users)
      .set({
        favoriteIds: updateFavoriteIds,
      })
      .where(eq(users.id, userId))
      .returning();

    return c.json({ success: true }, 200);
  }
);

app.get("/favorites", protect, async (c) => {
  const userData = c.get("user");
  const [user] = await db
    .select({ favoriteIds: users.favoriteIds })
    .from(users)
    .where(eq(users.id, userData?.id!));

  const favoriteIds = user?.favoriteIds ?? [];

  if (favoriteIds.length === 0) {
    return c.json([], 200);
  }

  const favoritedMovies = await db
    .select()
    .from(movies)
    .where(inArray(movies.id, favoriteIds));

  return c.json(favoritedMovies, 200);
});

export const GET = handle(app);
export const POST = handle(app);
export const DELETE = handle(app);
