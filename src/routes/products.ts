import { Router } from "express";
import { createProductHandler, getProductsHandler, getProductHandler, updateProductHandler } from "../controllers/productController.js";
import { validate } from "../middleware/validate.js";
import { createProductSchema } from "../validators/productValidator.js";

const router = Router();

router.post("/", validate(createProductSchema), createProductHandler);
router.get("/", getProductsHandler);
router.get("/:id", getProductHandler);
router.put("/:id", validate(createProductSchema), updateProductHandler);

export default router;