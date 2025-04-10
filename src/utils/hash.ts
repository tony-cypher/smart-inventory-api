import { hash } from "bcryptjs";

export const hashPassword = async (plain: string) => {
  return await hash(plain, 10);
};
