import pool from "../db.js";
import bcrypt from "bcrypt";

export const createUser = async (email: string, password: string) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
      "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id, email, created_at",
      [email, hashedPassword],
    );

    return result.rows[0];
  } catch (err: any) {
    if(err.code === '23505') {
        throw new Error("Email already exists");
    }
    throw err;
  }
};

export const findUserByEmail = async (email: string) => {
  const result = await pool.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);

  return result.rows[0];
};

export const findUserById = async (id: number) => {
  const result = await pool.query(
    "SELECT id, email, created_at FROM users WHERE id = $1",
    [id],
  );

  return result.rows[0];
};
