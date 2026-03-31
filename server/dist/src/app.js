import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger.config.js";
import authRouter from "./routes/auth.route.js";
dotenv.config();
const app = express();
app.use(cors({ origin: process.env.CORS_ORIGIN || "*" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.get("/", (_, res) => {
    return res.json({ status: 200, message: "Server is running" });
});
app.use("/api/v1", authRouter);
app.use((req, res) => {
    res.status(404).json({ status: 404, message: "Route not found" });
});
export default app;
//# sourceMappingURL=app.js.map