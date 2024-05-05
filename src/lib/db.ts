import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import * as schema from "@/drizzle/schema";

const sqlite = new Database(process.env.AUTH_DRIZZLE_URL);
const db = drizzle(sqlite, { schema });

export default db;
