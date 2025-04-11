import { Request, Response } from "express";
import {
  createStoreService,
  getAllStoresService,
} from "src/services/store.service";
import { AuthenticationRequest } from "src/types/auth";

export const getAllStores = async (_req: Request, res: Response) => {
  try {
    const stores = await getAllStoresService();
    res.status(200).json({ stores });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const createStore = async (
  req: AuthenticationRequest,
  res: Response
) => {
  try {
    const { name, location } = req.body;
    const ownerId = req.user?.id;

    if (!ownerId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const store = await createStoreService({ name, location, ownerId });
    res.status(201).json({ store });
  } catch (error: any) {
    if (error.code === "P2002") {
      // Prisma unique constraint violation
      res.status(400).json({ message: "User already owns a store" });
      return;
    }
    res.status(500).json({ message: error.message });
  }
};
