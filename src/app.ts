import express from "express";
import cors from "cors";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import cookieParser from "cookie-parser";
import { errorHandler } from "./middlewares/error.middleware";
import authRoutes from "./routes/auth.routes";
import usersRoutes from "./routes/user.routes";
import { swaggerSpec } from "./lib/swagger";

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Simple Test Route
app.get("/api/test", (req, res) => {
  res.status(200).json({ message: "API is working fine!" });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoutes);

app.use(errorHandler);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default app;
