import "dotenv/config";
import express from "express";
import { fileURLToPath } from "url";
import logger from "./middleware/logger.js";
import { booksRouter } from "./routes/booksRouter.js";
import { usersRouter } from "./routes/usersRoutes.js";

const app = express();

app.use(logger);

app.use(express.json());

app.use("/api/users", usersRouter);
app.use("/api/books", booksRouter);

const errorHandler = (err, req, res, next) => {
  res.status(err.status || 500).json({
    errorMessage: err.message || "Something went wrong. Please try again.",
  });
};

app.use(errorHandler);

const isDirectRun =
  process.argv[1] &&
  fileURLToPath(import.meta.url) === process.argv[1];

if (isDirectRun) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log("The server runs on port: " + PORT));
}

export default app;
