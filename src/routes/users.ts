import { Router } from "express";
import pool from "../db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { authMiddleware, type AuthRequest } from "../middleware/auth.js";

const router = Router();

// CREATE USER
router.post("/", async (req, res) => {
  const { email, password } = req.body;

  const existingUser = await pool.query(
    "SELECT * FROM users WHERE email = $1",
    [email],
  );
  if (existingUser.rows.length > 0) {
    return res
      .status(400)
      .json({ error: "Account with this email already exists" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id, email, created_at",
      [email, hashedPassword],
    );

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Failed to create user" });
  }
});

// GET ALL USERS
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM users");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    const user = result.rows[0];

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

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    await pool.query(
      "INSERT INTO refresh_tokens (user_id, token, expires_at) VALUES ($1, $2, $3)",
      [user.id, refreshToken, expiresAt],
    );

    res.json({
      accessToken,
      refreshToken,
    });
  } catch (err) {
    return res.status(500).json({ error: "Failed Login Attempt" });
  }
});

router.get("/me", authMiddleware, async (req: AuthRequest, res) => {
  const userId = req.userId;

  const result = await pool.query(
    "SELECT id, email, created_at FROM users WHERE id = $1",
    [userId],
  );

  res.json(result.rows[0]);
});

// Get user by id
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
