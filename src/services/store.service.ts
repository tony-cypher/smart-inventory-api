import prisma from "@lib/prisma";

export const getAllStoresService = async () => {
  return await prisma.store.findMany({
    include: {
      owner: {
        select: { id: true, email: true, role: true },
      },
      users: {
        select: {
          id: true,
          email: true,
        },
      },
    },
  });
};

interface StoreInput {
  name: string;
  location?: string;
  ownerId: string;
}

interface StoreUpdate {
  storeId: string;
  ownerId: string;
  name?: string;
  location?: string;
}

export const createStoreService = async ({
  name,
  location,
  ownerId,
}: StoreInput) => {
  const existingStore = await prisma.store.findUnique({
    where: {
      ownerId: ownerId,
    },
  });

  if (existingStore) {
    throw new Error("User already owns a store");
  }
  const store = await prisma.store.create({
    data: {
      name,
      location,
      ownerId,
    },
  });
  return store;
};

export const getStoreByIdService = async (id: string) => {
  const store = await prisma.store.findUnique({
    where: { id },
    include: {
      owner: true,
      products: true,
      users: true,
    },
  });

  if (!store) {
    throw new Error("Store not found");
  }

  return store;
};

export const updateStoreService = async ({
  storeId,
  ownerId,
  name,
  location,
}: StoreUpdate) => {
  const store = await prisma.store.findUnique({
    where: { id: storeId },
  });

  if (!store) {
    throw new Error("Store not found");
  }

  if (store.ownerId !== ownerId) {
    throw new Error("Unauthorized: You are not the owner of this store");
  }

  const updatedStore = await prisma.store.update({
    where: { id: storeId },
    data: { name, location },
  });

  return updatedStore;
};

export const deleteStoreService = async ({
  storeId,
  userId,
  role,
}: {
  storeId: string;
  userId: string;
  role: string;
}) => {
  const store = await prisma.store.findUnique({
    where: { id: storeId },
  });

  if (!store) {
    throw new Error("Store not found");
  }

  console.log(role);
  if (store.ownerId !== userId && role !== "ADMIN") {
    throw new Error(
      "Unauthorized: You are not authorized to delete this store"
    );
  }

  await prisma.store.delete({
    where: { id: storeId },
  });

  return { message: "Store deleted successfully" };
};
