import {
  createStore,
  deleteStore,
  getAllStores,
  getStoreById,
  updateStore,
} from "@controllers/store.controller";
import { isAdmin } from "@middlewares/admin.middleware";
import { isAuthenticated } from "@middlewares/auth.middleware";
import { Router } from "express";

const router = Router();

router.get("/", isAuthenticated, isAdmin, getAllStores);
router.post("/", isAuthenticated, createStore);
router.get("/:id", getStoreById);
router.put("/:id", isAuthenticated, updateStore);
router.delete("/:id", isAuthenticated, deleteStore);

export default router;
