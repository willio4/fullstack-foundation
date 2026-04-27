import { Router } from "express";
import {
  createOrderHandler,
  getUserOrdersHandler,
} from "../controllers/orderController.js";
import { authMiddleware } from "../middleware/auth.js";

const router = Router();

router.use(authMiddleware);

router.post("/", createOrderHandler);
router.get("/", getUserOrdersHandler);

export default router;
