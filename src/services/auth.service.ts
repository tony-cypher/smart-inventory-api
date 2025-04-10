import prisma from "../lib/prisma";
import bcrypt from "bcrypt";
import { hashPassword } from "../utils/hash";
import { registerSchema } from "../validators/auth.validator";
import { signToken } from "src/lib/jwt";

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

export const loginService = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error("User not found");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid credentials");

  const token = signToken({ userId: user.id, email: user.email });

  return {
    user: {
      id: user.id,
      email: user.email,
      role: user.role,
    },
    token,
  };
};

export const getCurrentUserService = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, email: true, role: true, createdAt: true },
  });

  if (!user) throw new Error("User not found");
  return user;
};

export const logoutService = () => {
  return { message: "Logged out successfully" };
};
