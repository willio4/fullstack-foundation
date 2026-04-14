import express from "express";
import usersRouter from "./routes/users.js";
import { errorHandler } from "./middleware/errorHandler.js";

const app = express();

app.use(express.json());
app.use("/users", usersRouter);
app.use(errorHandler);

export default app;