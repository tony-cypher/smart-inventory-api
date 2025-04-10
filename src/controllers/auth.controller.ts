import { Request, Response, NextFunction } from "express";
import { registerUserService } from "../services/auth.service";

export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await registerUserService(req.body);
    res.status(201).json({
      message: "User registered successfully",
      user,
    });
  } catch (error: any) {
    next(error);
  }
};
