import { Router } from "express";
import { login, logout, registerUser } from "../controllers/auth.controller";
import authenticate from "src/middlewares/auth.middleware";

const router = Router();

router.post("/signup", registerUser);
router.post("/login", login);
// router.get("/me", authenticate, getMe);
// router.post("/logout", authenticate, logout);

export default router;
