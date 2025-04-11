import { Request, Response } from "express";
import {
  deleteUserService,
  getAllUsersService,
  getUserByIdService,
  updateUserService,
} from "src/services/user.service";
import { AuthenticationRequest } from "src/types/auth";

export const getAllUsers = async (
  req: AuthenticationRequest,
  res: Response
) => {
  try {
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

export const updateUser = async (
  req: AuthenticationRequest,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const userData = req.body;

    const updatedUser = await updateUserService(id, userData);
    res.status(200).json({ user: updatedUser });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

export const deleteUser = async (
  req: AuthenticationRequest,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const deletedUser = await deleteUserService(id);

    res
      .status(200)
      .json({ message: `User with ID ${id} deleted successfully` });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
