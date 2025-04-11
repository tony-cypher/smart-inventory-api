import { Request } from "express";

export interface JwtPayload {
  userId: string;
  email: string;
  role: string;
  iat?: number;
  exp?: number;
}

export interface AuthenticatedUser {
  id: string;
  email: string;
  role: string;
}

export interface AuthenticationRequest extends Request {
  user?: AuthenticatedUser;
}
