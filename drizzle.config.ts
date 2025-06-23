import { defineConfig } from "drizzle-kit";
import { env } from 'node:process';


const {
  DB_FILE_NAME,
} = env


const defaultConfig = defineConfig({
  dialect: "sqlite",
  casing: 'snake_case',
  out: `./src/db/migrations/schema`,
  schema: "./src/db/schema.ts",
  dbCredentials: {
    url: DB_FILE_NAME,
  }
});

export default defaultConfig;
