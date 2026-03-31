import express, { Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import swaggerUi from "swagger-ui-express";
import cookieParser from "cookie-parser";
import { swaggerSpec } from "./src/config/swagger.config.js";
import authRouter from "./src/routes/auth.route.js";
import propertyRouter from "./src/routes/property.route.js";
import path from "node:path";
import favoriteRouter from "./src/routes/favorite.route.js";

dotenv.config();

const app = express();

app.use(cors({ origin: process.env.CORS_ORIGIN || "*", credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(helmet());
const uploadPath = path.join(process.cwd(), "public/uploads");
app.use(cors({ origin: process.env.CORS_ORIGIN || "*", credentials: true }));
app.use("/uploads", cors(), express.static(uploadPath));
// Swagger docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Test route
app.get("/", (_, res: Response) => {
  return res.json({ status: 200, message: "Server is running" });
});

// API routes
app.use("/api/v1", authRouter);
app.use("/api/v1/properties", propertyRouter);
app.use("/api/v1/favorites", favoriteRouter);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ status: 404, message: "Route not found" });
});

export default app;
