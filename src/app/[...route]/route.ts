import { auth } from "@/lib/auth";
import { Hono } from "hono";
import { handle } from "hono/vercel";
import { protect } from "./(middlewares)/protect";
import { db } from "@/database";
import { movies, users } from "@/database/schema";
import { count, eq } from "drizzle-orm";
import { without } from "lodash";
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

    if (!existingMovie || existingMovie.length <= 0) {
      return c.json(
        {
          success: false,
          message: "Movie not found",
        },
        404
      );
    }

    const user = await db
      .select()
      .from(users)
      .where(eq(users.id, userData?.id!));

    const userUpdate = await db
      .update(users)
      .set({
        favoriteIds: [...user[0].favoriteIds, movieId],
      })
      .where(eq(users.id, movieId))
      .returning();

    return c.json(userUpdate, 200);
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

    const existingMovie = await db
      .select()
      .from(movies)
      .where(eq(movies.id, movieId));

    if (!existingMovie || existingMovie.length <= 0) {
      return c.json(
        {
          success: false,
          message: "Movie not found",
        },
        404
      );
    }

    const user = await db
      .select()
      .from(users)
      .where(eq(users.id, userData?.id!));

    const updateFavoriteIds = without(user[0].favoriteIds, movieId);

    const updateUser = await db
      .update(users)
      .set({
        favoriteIds: updateFavoriteIds,
      })
      .where(eq(users.id, movieId))
      .returning();

    return c.json(updateUser, 200);
  }
);

app.get("/favorites", protect, async (c) => {
  const userData = c.get("user");
  const favoriteMovies = await db
    .select({ favoriteIds: users.favoriteIds })
    .from(users)
    .where(eq(users.id, userData?.id!));
  return c.json(favoriteMovies[0].favoriteIds, 200);
});

export const GET = handle(app);
export const POST = handle(app);
export const DELETE = handle(app);
