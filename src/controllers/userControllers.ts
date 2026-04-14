import { createUser, findUserByEmail } from "../services/userService.js";
import dotenv from "dotenv";
dotenv.config();
import pool from "../db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import type { Request, Response } from "express";

// Register
export const registerUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await createUser(email, password);

  res.json(user);
};

// Login
export const loginUser = async (req: Request, res: Response) => {
  const [email, password] = req.body;

  const user = await findUserByEmail(email);

  if (!user) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const accessToken = jwt.sign(
    { userId: user.id },
    process.env.ACCESS_TOKEN_SECRET as string,
    { expiresIn: "15m" },
  );

  const refreshToken = jwt.sign(
    { userId: user.id },
    process.env.REFRESH_TOKEN_SECRET as string,
    { expiresIn: "7d" },
  );

  res.json({ accessToken, refreshToken })
};
