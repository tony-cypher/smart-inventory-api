import { Request, Response, NextFunction } from "express";
import {
  getCurrentUserService,
  loginService,
  logoutService,
  registerUserService,
} from "../services/auth.service";
import { AuthenticationRequest } from "src/types/auth";

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

    // set cookie
    res.cookie("jwt", token, {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).json({ user });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getMe = async (req: AuthenticationRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    const user = await getCurrentUserService(userId!);
    res.status(200).json({ user });
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};

export const logout = (req: AuthenticationRequest, res: Response) => {
  res.clearCookie("jwt", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
  const result = logoutService(req.user?.email);
  res.status(200).json(result);
};
