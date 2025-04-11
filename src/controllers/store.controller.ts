import { Request, Response } from "express";
import {
  createStoreService,
  deleteStoreService,
  getAllStoresService,
  getStoreByIdService,
  updateStoreService,
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

export const getStoreById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const storeId = req.params.id;

  try {
    const store = await getStoreByIdService(storeId);
    res.status(200).json(store);
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};

export const updateStore = async (
  req: AuthenticationRequest,
  res: Response
): Promise<void> => {
  const storeId = req.params.id;
  const { name, location } = req.body;
  const ownerId = req.user?.id;

  if (!ownerId) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  try {
    const updatedStore = await updateStoreService({
      storeId,
      ownerId,
      name,
      location,
    });
    res.status(200).json({
      message: "Store updated successfully",
      data: updatedStore,
    });
  } catch (error: any) {
    res.status(403).json({ message: error.message });
  }
};

export const deleteStore = async (
  req: AuthenticationRequest,
  res: Response
): Promise<void> => {
  const storeId = req.params.id;
  const userId = req.user?.id;
  const role = req.user?.role || "";

  if (!userId) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  try {
    const result = deleteStoreService({ storeId, userId, role });
    res.status(200).json({ message: (await result).message });
  } catch (error: any) {
    res.status(403).json({ message: error.message });
  }
};
