import pool from "../db.js";

export const addToCart = async (userId: number, productId: number, quantity: number) => {
    const result = await pool.query(
        `
        INSERT INTO cart_items (user_id, product_id, quantity)
        VALUES ($1 ,$2 ,$3)
        ON CONFLICT (user_id, product_id)
        DO UPDATE SET quantity = cart_items.quantity + $3
        RETURNING *
        `,
        [userId, productId, quantity]
    );

    return result.rows[0];
};

export const getCart = async (userId: number) => {
    const result = await pool.query(
        `
        SELECT
            cart_items.id,
            cart_items.quantity,
            products.id as product_id,
            products.name,
            products.price
        FROM cart_items
        JOIN products ON cart_items.product_id = products.id
        WHERE cart_items.user_id = $1
        `,
        [userId]
    );

    return result.rows;
};

export const updateCart = async (userId: number, productId: number, quantity: number) => {
    const result = await pool.query(
        `
        UPDATE cart_items
        SET quantity = $1
        WHERE user_id = $2 and product_id = $3
        RETURNING *
        `,
        [quantity, userId, productId]
    );

    return result.rows[0];
}

export const removeFromCart = async (userId: number, productId: number) => {
    await pool.query(
        "DELETE FROM cart_items WHERE user_id = $1 AND product_id = $2",
        [userId, productId]
    )
}