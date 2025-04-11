import { Router } from "express";
import { getAllUsers, getSingleUser } from "src/controllers/user.controller";
import { authenticate } from "src/middlewares/auth.middleware";

const router = Router();

router.get("/", authenticate, getAllUsers);
router.get("/:id", authenticate, getSingleUser);

export default router;
