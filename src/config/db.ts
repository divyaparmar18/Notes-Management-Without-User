import { DataSource } from "typeorm";
import dotenv from "dotenv";
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";

dotenv.config();

const envType = process.env.NODE_ENV;

const postgresConfig = {
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
};

let dbParams = {
  ...postgresConfig,
  type: "postgres",
  synchronize: false,
  logging: false,
  entities:
    envType === "local"
      ? ["src/models/**/*.model.ts"]
      : ["dist/models/**/*.model.js"],
  migrations:
    envType === "local" ? ["src/migrations/**/*.ts"] : ["migrations/**/*.js"],
  ssl: {
    rejectUnauthorized: false,
  },
} as PostgresConnectionOptions;

if (envType === "local") {
  const { ssl, ...paramsWithoutSsl } = dbParams;
  dbParams = paramsWithoutSsl;
}

const AppDataSource = new DataSource(dbParams);

export { AppDataSource };
