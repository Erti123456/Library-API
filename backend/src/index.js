import "dotenv/config";
import express from "express";
import logger from "./middleware/logger.js";
import { booksRouter } from "./routes/booksRouter.js";
import { usersRouter } from "./routes/usersRoutes.js";

const app = express();

app.use(logger);

app.use(express.json());

app.use("/users", usersRouter);
app.use("/books", booksRouter);

const errorHandler = (err, req, res, next) => {
  res.status(err.status).json({ errorMessage: err.message });
};

app.use(errorHandler);

// const PORT = 3000;
// app.listen(PORT, () => console.log("The server runs on port: " + PORT));
export default app;
