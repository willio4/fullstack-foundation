import pool from "../db.js";

export const createProduct = async (
  name: string,
  description: string,
  price: number,
) => {
  const result = await pool.query(
    "INSERT INTO products (name, description, price) VALUES ($1, $2, $3) RETURNING *",
    [name, description, price],
  );
  return result.rows[0];
};

export const getAllProducts = async (
  limit: number,
  offset: number,
  minPrice?: number,
  maxPrice?: number,
) => {
  let query = `
        SELECT * FROM products
        WHERE 1=1
    `;

  const values = [];

  if (minPrice) {
    values.push(minPrice);
    query += ` AND price >= $${values.length}`;
  }
  if (maxPrice) {
    values.push(maxPrice);
    query += ` AND price <= $${values.length}`;
  }

  values.push(limit);
  values.push(offset);

  query += ` ORDER BY created_at DESC LIMIT $${values.length - 1} OFFSET $${values.length}`;

  const result = await pool.query(query, values);

  return result.rows;
};

export const getProductById = async (id: number) => {
  const result = await pool.query("SELECT * FROM products WHERE id = $1", [id]);
  return result.rows[0];
};

export const updateProduct = async (
  id: number,
  name: string,
  description: string,
  price: number,
) => {
  const result = await pool.query(
    "UPDATE products SET name = $1, description = $2, price = $3 WHERE id = $4 RETURNING *",
    [name, description, price, id],
  );

  return result.rows[0];
};
