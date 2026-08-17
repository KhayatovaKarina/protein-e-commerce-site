import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

const databaseUrl = "postgresql://kaiki_c_745d9fb62aa79d3664730ee8:Kk1!oDhlW-OLUd-7boI3-4Dwy-NXq6py@ep-9a3d6d3d107a.kaiki.ru:5432/proteindb?sslmode=require&connection_limit=10";

if (!databaseUrl) {
  throw new Error("DATABASE_URL is required");
}

const globalForDb = globalThis as typeof globalThis & {
  __arenaNextJsPostgresqlPool?: Pool;
};

export const pool =
  globalForDb.__arenaNextJsPostgresqlPool ??
  new Pool({
    connectionString: databaseUrl,
  });

if (process.env.NODE_ENV !== "production") {
  globalForDb.__arenaNextJsPostgresqlPool = pool;
}

export const db = drizzle(pool);
