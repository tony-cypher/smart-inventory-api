import express from "express";
import cors from "cors";
import morgan from "morgan";
import { errorHandler } from "./middlewares/error.middleware";
import authRoutes from "./routes/auth.routes";

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Simple Test Route
app.get("/api/test", (req, res) => {
  res.status(200).json({ message: "API is working fine!" });
});

// Routes
app.use("/api/auth", authRoutes);

app.use(errorHandler);

export default app;
