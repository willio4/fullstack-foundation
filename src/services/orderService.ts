import pool from "../db.js";

export const createOrder = async (userId: number) => {
    const client = await pool.connect();

    try {
        await client.query("BEGIN");

        const cartResult = await client.query(
            `
            SELECT cart_items.product_id, cart_items.quantity, products.price
            FROM cart_items
            JOIN products ON cart_items.product_id = products.id
            WHERE cart_items.user_id = $1
            `,
            [userId]
        );

        const cartItems = cartResult.rows;

        if (cartItems.length === 0) {
            throw new Error("Cart is empty")
        };

        const total = cartItems.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
        );

        const orderResult = await client.query(
            "INSERT INTO orders (user_id, total) VALUES ($1, $2) RETURNING *",
            [userId, total]
        );

        const order = orderResult.rows[0];

        for (const item of cartItems) {
            await client.query(
                `
                INSERT INTO order_items (order_id, product_id, quantity, price)
                VALUES ($1, $2, $3, $4)
                `,
                [order.id, item.product_id, item.quantity, item.price]
            );
        }

        await client.query(
            "DELETE FROM cart_items WHERE user_id = $1",
            [userId]
        );

        await client.query("COMMIT");

        return order;

    } catch (err) {
        await client.query("ROLLBACK");
        throw err;
    } finally {
        client.release();
    }
};

export const getUserOrders = async (userId: number) => {
    const result = await pool.query(
        "SELECT * FROM orders WHERE user_id = $1 ORDER BY created_at DESC",
        [userId]
    );

    return result.rows;
}