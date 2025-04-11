// import { Request, Response } from "express";
// import { getAllUsers, getUserById } from "src/services/user.service";

// export const handleGetAllUsers = async (req: Request, res: Response) => {
//   const users = await getAllUsers();
//   return res.status(200).json({ users });
// };

// export const handleGetUserById = async (req: Request, res: Response) => {
//   const { id } = req.params;
//   const user = await getUserById(id);

//   if (!user) {
//     return res.status(404).json({ message: "User not found" });
//   }

//   return res.status(200).json({ user });
// };
