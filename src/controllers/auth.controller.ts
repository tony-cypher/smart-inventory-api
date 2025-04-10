import { Request, Response, NextFunction } from "express";
import {
  getCurrentUserService,
  loginService,
  logoutService,
  registerUserService,
} from "../services/auth.service";

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

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const { user, token } = await loginService(email, password);
    res.status(200).json({
      message: "Login successful",
      token,
      user,
    });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// export const getMe = async (req: Request, res: Response) => {
//   try {
//     const userId = req.user.userId;
//     const user = await getCurrentUserService(userId);
//     res.status(200).json({ user });
//   } catch (error: any) {
//     res.status(404).json({ message: error.message });
//   }
// };

export const logout = (_req: Request, res: Response) => {
  const result = logoutService();
  res.status(200).json(result);
};
