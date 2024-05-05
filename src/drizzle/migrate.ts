import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import { migrate } from "drizzle-orm/better-sqlite3/migrator";
import * as schema from "./schema";

const run = async () => {
  const sqlite = new Database(process.env.AUTH_DRIZZLE_URL);
  const db = drizzle(sqlite, { schema });

  migrate(db, { migrationsFolder: "src/drizzle/migrations" });

  sqlite.close();
};

run();
