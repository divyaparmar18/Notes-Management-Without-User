import express, { Express } from "express";
import dotenv from "dotenv";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import { AppDataSource } from "./config/db";
import specs from "./swagger-config";
import notesRouter from "./routes/notes";
import logger from "./utils/logger";

dotenv.config();
const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
app.use("/", notesRouter);

const start = async () => {
  try {
    await AppDataSource.initialize();
    app.listen(port, () => {
      logger.info(`⚡️[server]: Server is running at http://localhost:${port}`);
    });
  } catch (error) {
    logger.error("Failed to initialize AppDataSource:", error);
    process.exit(1);
  }
};

start();
export { app };
