import { Router } from "express";
import {
  getMe,
  login,
  logout,
  registerUser,
} from "../controllers/auth.controller";
import { isAuthenticated } from "@middlewares/auth.middleware";

const router = Router();

router.post("/signup", registerUser);
router.post("/login", login);
router.get("/me", isAuthenticated, getMe);
router.post("/logout", isAuthenticated, logout);

export default router;
