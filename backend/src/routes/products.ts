import { Router } from "express";
import { createProductHandler, getProductsHandler, getProductHandler, updateProductHandler } from "../controllers/productController.js";
import { validate } from "../middleware/validate.js";
import { createProductSchema } from "../validators/productValidator.js";
import { authMiddleware } from "../middleware/auth.js";
import { adminMiddleware } from "../middleware/admin.js";

const router = Router();

router.post("/", authMiddleware, adminMiddleware, validate(createProductSchema), createProductHandler);
router.get("/", getProductsHandler);
router.get("/:id", getProductHandler);
router.put("/:id", authMiddleware, adminMiddleware, validate(createProductSchema), updateProductHandler);

export default router;