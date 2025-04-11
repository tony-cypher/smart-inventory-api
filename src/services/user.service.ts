import prisma from "@lib/prisma";
import { User } from "@prisma/client";

export const getAllUsersService = async () => {
  return prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
    },
  });
};

export const getUserByIdService = async (id: string) => {
  return prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
    },
  });
};

export const updateUserService = async (id: string, data: Partial<User>) => {
  const user = await prisma.user.update({
    where: { id },
    data,
  });

  if (!user) {
    throw new Error("User not found");
  }
  return user;
};

export const deleteUserService = async (id: string) => {
  const user = await prisma.user.delete({
    where: { id },
  });

  if (!user) {
    throw new Error("User not found");
  }
  return user;
};
