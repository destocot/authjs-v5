import "dotenv/config";
import { defineConfig } from "drizzle-kit";
import type { Config } from "drizzle-kit";

const config = {
  schema: "src/drizzle/schema.ts",
  out: "src/drizzle/migrations",
  driver: "better-sqlite",
  dbCredentials: {
    url: process.env.AUTH_DRIZZLE_URL!,
  },
  verbose: true,
  strict: true,
} satisfies Config;

export default defineConfig(config);
