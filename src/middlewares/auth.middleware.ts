import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import prisma from "src/lib/prisma";
import { AuthenticationRequest, JwtPayload } from "src/types/auth";

export const authenticate = async (
  req: AuthenticationRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token = req.cookies?.jwt || req.headers.authorization?.split(" ")[1];

    if (!token) {
      return next(new Error("Unauthorized: No Token Provided"));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: { id: true, email: true, role: true },
    });

    if (!user) {
      return next(new Error("Unauthorized: User Not Found"));
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Auth Middleware Error:", error);
    next(new Error("Unauthorized: Invalid token"));
  }
};
