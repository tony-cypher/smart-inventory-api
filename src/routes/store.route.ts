import { Router } from "express";
import {
  createStore,
  deleteStore,
  getAllStores,
  getStoreById,
  updateStore,
} from "src/controllers/store.controller";
import { isAdmin } from "src/middlewares/admin.middleware";
import { isAuthenticated } from "src/middlewares/auth.middleware";

const router = Router();

router.get("/", isAuthenticated, isAdmin, getAllStores);
router.post("/", isAuthenticated, createStore);
router.get("/:id", getStoreById);
router.put("/:id", isAuthenticated, updateStore);
router.delete("/:id", isAuthenticated, deleteStore);

export default router;
