import { Router } from "express";
import { login, registerUser } from "../controllers/auth.controller";

const router = Router();

router.post("/signup", registerUser);
router.post("/login", login);

export default router;
