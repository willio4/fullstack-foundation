import type { NextFunction, Request, Response } from "express";
import type { AuthRequest } from "./auth.js";
import { findUserById } from "../services/userService.js";

export const adminMiddleware = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  const userId = req.user?.userId;

  if (!userId) {
    return res.status(401).json({ error: "User not authenticated" });
  };

  const user = await findUserById(userId);

  if (!user || user.role !== "admin") {
    return res.status(403).json({ error: "Admin access required" });
  }

  next();
};
