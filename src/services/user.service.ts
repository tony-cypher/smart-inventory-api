// import prisma from "src/lib/prisma";

// export const getAllUsers = async () => {
//   return prisma.user.findMany({
//     select: {
//       id: true,
//       name: true,
//       email: true,
//       role: true,
//       createdAt: true,
//     },
//   });
// };

// export const getUserById = async (id: string) => {
//   return prisma.user.findUnique({
//     where: { id },
//     select: {
//       id: true,
//       name: true,
//       email: true,
//       role: true,
//       createdAt: true,
//     },
//   });
// };
