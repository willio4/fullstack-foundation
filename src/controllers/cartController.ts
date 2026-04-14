import {
  addToCart,
  getCart,
  updateCart,
  removeFromCart,
} from "../services/cartService.js";
import type { Request, Response } from "express";

export const addToCartHandler = async (req: Request, res: Response) => {
  const userId = req.user?.userId;
  const { productId, quantity } = req.body;

  if (!userId) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  const item = await addToCart(userId, productId, quantity || 1);

  res.json(item);
};

export const getCartHandler = async (req: Request, res: Response) => {
  const userId = req.user?.userId;

  if (!userId) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  const cart = await getCart(userId);

  res.json(cart);
};

export const updateCartHandler = async (req: Request, res: Response) => {
  const userId = req.user?.userId;
  const { productId, quantity } = req.body;

  if (!userId) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  const item = await updateCart(userId, productId, quantity);

  res.json(item);
};

export const removeFromCartHandler = async (req: Request, res: Response) => {
  const userId = req.user?.userId;
  const { productId } = req.body;

  if (!userId) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  await removeFromCart(userId, productId);

  res.json({ message: "Item removed" });
};
