import { Router } from "express";
import { createStore, getAllStores } from "src/controllers/store.controller";
import { isAdmin } from "src/middlewares/admin.middleware";
import { isAuthenticated } from "src/middlewares/auth.middleware";

const router = Router();

router.get("/", isAuthenticated, isAdmin, getAllStores);
router.post("/", isAuthenticated, createStore);

export default router;
