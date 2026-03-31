import { defineConfig } from "prisma/config";
import "dotenv/config";

const databaseUrl =
  process.env.NODE_ENV === "production"
    ? process.env.DATABASE_URL
    : process.env.DATABASE_URL_LOCAL;

export default defineConfig({
  migrations: {
    path: "prisma/migrations",
    seed: "tsx ./prisma/seed.ts",
  },
  datasource: {
    url: databaseUrl,
  },
});
