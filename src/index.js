import express from "express";
import fs from "node:fs/promises";
import logger from "./middleware/logger.js";
import { validateBook } from "./middleware/validator.js";
import { validateBookPatchMethod } from "./middleware/validator.js";
import ERRORS from "./utils/errors.js";
import {
  createBook,
  getBookById,
  getBooks,
} from "./controllers/booksController.js";
const app = express();

app.use(logger);

app.use(express.json());

app.get("/books", getBooks);
app.get("/books/:id", getBookById);
app.post("/books", validateBook, createBook);
app.delete("/books/:id", (req, res) => {
  const reqUrlId = Number(req.params.id);
  inMemoryArr = inMemoryArr.filter((book) => book.id !== reqUrlId);
  res.status(204).json(inMemoryArr);
});

app.patch("/books/:id", validateBookPatchMethod, (req, res, next) => {
  const reqUrlId = Number(req.params.id);
  inMemoryArr = inMemoryArr.map((book) => {
    if (book.id === reqUrlId) {
      return { ...book, ...req.body };
    }
    return book;
  });
  const updatedBook = inMemoryArr.find((b) => b.id === reqUrlId);
  if (updatedBook) {
    return res.json(updatedBook);
  } else {
    return next(ERRORS.BOOK_NOT_FOUND);
  }
});

app.put("/books/:id", validateBook, (req, res, next) => {
  const reqUrlId = Number(req.params.id);
  let found = false;
  inMemoryArr = inMemoryArr.map((book) => {
    if (reqUrlId === book.id) {
      found = true;
      return { id: reqUrlId, ...req.body };
    }
    return book;
  });
  if (found) {
    res.json({ id: reqUrlId, ...req.body });
  } else {
    return next(ERRORS.BOOK_NOT_FOUND);
  }
});

const errorHandler = (err, req, res, next) => {
  res.status(err.status).json({ errorMessage: err.message });
};

app.use(errorHandler);

const PORT = 3000;
app.listen(PORT, () => console.log("The server runs on port: " + PORT));
