import jwt from "jsonwebtoken";
import type { Request, Response, NextFunction } from "express";
import pool from "../db.js";

export interface AuthRequest extends Request {
    userId?: number;
}

export const authMiddleware = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {
    const authHeader = req.headers.authorization;

    if(!authHeader) {
        return res.status(401).json({error: "No token provided"});
    }

    const token = authHeader.split(" ")[1];

    const result = await pool.query(
        "SELECT * FROM token_blacklist WHERE token = $1",
        [token]
    );

    if(result.rows.length > 0) {
        return res.status(401).json({error: "Token revoked"})
    }

    try {
        const decoded = jwt.verify(
            token,
            process.env.ACCESS_TOKEN_SECRET as string
        ) as { userId: number};

        req.userId = decoded.userId;

        next();
    } catch(err) {
        return res.status(401).json({error: "Invalid token"});
    }
}