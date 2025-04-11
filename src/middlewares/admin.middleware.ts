import { Request, Response, NextFunction } from "express";
import { AuthenticationRequest } from "src/types/auth";

export const isAdmin = (
  req: AuthenticationRequest,
  res: Response,
  next: NextFunction
): void => {
  if (req.user?.role !== "ADMIN") {
    res.status(403).json({ message: "Access denied: Admins only" });
    return;
  }

  next();
};
