import express from "express";
import usersRouter from "./routes/users.js";
import productRoutes from "./routes/products.js";
import cartRoutes from "./routes/cart.js";
import orderRoutes from "./routes/order.js"
import { errorHandler } from "./middleware/errorHandler.js";
import helmet from "helmet";
import cors from "cors";

declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: number;
      };
    }
  }
}

const app = express();

app.use(express.json());
app.use("/users", usersRouter);
app.use("/products", productRoutes);
app.use("/cart", cartRoutes);
app.use("/orders", orderRoutes);
app.use(helmet());
app.use(cors());
app.use(errorHandler);

export default app;