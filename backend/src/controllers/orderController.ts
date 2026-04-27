import { createOrder, getUserOrders } from "../services/orderService.js";
import type { Request, Response } from "express";

export const createOrderHandler = async (req: Request, res: Response) => {
  const userId = req.user?.userId;

  if (!userId) {
    return res.status(403).json({ error: "Unauthorized" });
  }

  const order = await createOrder(userId);

  res.json(order);
};

export const getUserOrdersHandler = async (req: Request, res: Response) => {
  const userId = req.user?.userId;

  if (!userId) {
    return res.status(403).json({ error: "Unauthorized" });
  }

  const orders = await getUserOrders(userId);

  res.json(orders);
};
