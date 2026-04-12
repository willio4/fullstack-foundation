import { Router } from "express";
import pool from "../db.js";

const router = Router();

// CREATE USER
router.post("/", async (req, res) => {
  console.log("HIT CREATE USER");
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
    const result = await pool.query(
      "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *",
      [email, password],
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.log("ERROR:", err);
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

export default router;
