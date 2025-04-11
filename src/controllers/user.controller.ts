import { Request, Response } from "express";
import {
  getAllUsersService,
  getUserByIdService,
} from "src/services/user.service";
import { AuthenticationRequest } from "src/types/auth";

export const getAllUsers = async (
  req: AuthenticationRequest,
  res: Response
) => {
  try {
    const requester = req.user;
    if (requester?.role !== "ADMIN") {
      res.status(403).json({ message: "Access denied: Admins only" });
      return;
    }

    const users = await getAllUsersService();
    res.status(200).json({ users });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getSingleUser = async (
  req: AuthenticationRequest,
  res: Response
) => {
  try {
    const { id } = req.params;
    const user = await getUserByIdService(id);

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.status(200).json({ user });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
