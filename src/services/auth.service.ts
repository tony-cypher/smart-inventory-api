import prisma from "../lib/prisma";
import { hashPassword } from "../utils/hash";
import { registerSchema } from "../validators/auth.validator";

export const registerUserService = async (data: unknown) => {
  const parsed = registerSchema.safeParse(data);
  if (!parsed.success) {
    throw { status: 400, error: parsed.error.flatten() };
  }

  const { name, email, password, role = "STORE_OWNER" } = parsed.data;

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    throw { status: 400, error: "Email already in use" };
  }

  const hashed = await hashPassword(password);

  const user = await prisma.user.create({
    data: { name, email, password: hashed, role },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
    },
  });

  return user;
};
