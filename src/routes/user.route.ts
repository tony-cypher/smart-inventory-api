import {
  deleteUser,
  getAllUsers,
  getSingleUser,
  updateUser,
} from "@controllers/user.controller";
import { isAdmin } from "@middlewares/admin.middleware";
import { isAuthenticated } from "@middlewares/auth.middleware";
import { Router } from "express";

const router = Router();

router.get("/", isAuthenticated, isAdmin, getAllUsers);
router.get("/:id", isAuthenticated, isAdmin, getSingleUser);
router.put("/:id", isAuthenticated, isAdmin, updateUser);
router.delete("/:id", isAuthenticated, isAdmin, deleteUser);

export default router;
