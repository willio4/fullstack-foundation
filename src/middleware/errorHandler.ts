import type { Request, Response, NextFunction } from "express";
export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.error(err);

  if (err.message === "Email already exists") {
    return res.status(400).json({ error: err.message });
  }

  if (err.message == "Cart is empty") {
    return res.status(400).json({ error: err.message });
  }

  res.status(500).json({
    error: "Internal Server Error",
  });
};
