import { Router } from "express";
import { registerUser, loginUser } from "../controllers/userControllers.js";
import { validate } from "../middleware/validate.js";
import { registerSchema, loginSchema } from "../validators/userValidator.js";
import pool from "../db.js";
import jwt from "jsonwebtoken";
import { authMiddleware, type AuthRequest } from "../middleware/auth.js";
import { findUserById } from "../services/userService.js";

const router = Router();

// Register
router.post("/", validate(registerSchema), registerUser);

// Login
router.post("/login", validate(loginSchema), loginUser);

// Get all users
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM users");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

router.get("/me", authMiddleware, async (req: AuthRequest, res) => {
  if (!req.user || !req.user.userId) {
    return res.status(401).json({ error: "User not authenticated" });
  }
  const user = await findUserById(req.user.userId);
  res.json(user);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  const result = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
  if (result.rows.length === 0) {
    res.status(404).json({ error: "User not found" });
  } else {
    res.json(result.rows[0]);
  }
});

router.post("/logout", async (req, res) => {
  console.log(req.body);
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(400).json({ error: "No refresh token" });
  }

  await pool.query("DELETE FROM refresh_tokens WHERE token = $1", [
    refreshToken,
  ]);

  res.json({ message: "Logged out" });
});

router.post("/refresh", async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(401).json({ error: "No refresh token" });
  }

  try {
    const stored = await pool.query(
      "SELECT * FROM refresh_tokens WHERE token = $1",
      [refreshToken],
    );

    if (stored.rows.length === 0) {
      return res.status(403).json({ error: "Invalid refresh token" });
    }

    const decoded = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET as string,
    ) as any;

    const newAccessToken = jwt.sign(
      { userId: decoded.userId },
      process.env.ACCESS_TOKEN_SECRET as string,
      { expiresIn: "15m" },
    );

    res.json({ accessToken: newAccessToken });
  } catch (err) {
    res.status(403).json({ error: "Token expired or invalid" });
  }
});

export default router;
