import { Router } from "express";
import {
  deleteUser,
  getAllUsers,
  getSingleUser,
  updateUser,
} from "src/controllers/user.controller";
import { isAdmin } from "src/middlewares/admin.middleware";
import { isAuthenticated } from "src/middlewares/auth.middleware";

const router = Router();

router.get("/", isAuthenticated, isAdmin, getAllUsers);
router.get("/:id", isAuthenticated, isAdmin, getSingleUser);
router.put("/:id", isAuthenticated, isAdmin, updateUser);
router.delete("/:id", isAuthenticated, isAdmin, deleteUser);

export default router;
