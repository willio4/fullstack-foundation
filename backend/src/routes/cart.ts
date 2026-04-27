import { Router } from "express";
import { addToCartHandler, 
         getCartHandler, 
         updateCartHandler, 
         removeFromCartHandler 
} from "../controllers/cartController.js";
import { authMiddleware } from "../middleware/auth.js";

const router = Router();

router.use(authMiddleware);

router.post("/", addToCartHandler);
router.get("/", getCartHandler);
router.put("/", updateCartHandler);
router.delete("/", removeFromCartHandler);

export default router;