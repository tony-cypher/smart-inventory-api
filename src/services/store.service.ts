import prisma from "src/lib/prisma";

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
