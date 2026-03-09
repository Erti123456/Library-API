import express from "express";
import { validateBook } from "../middleware/validator.js";
import { validateBookPatchMethod } from "../middleware/validator.js";
import {
  createBook,
  deleteBook,
  getBookById,
  getBooks,
  patchLogic,
  putLogic,
} from "../controllers/booksController.js";

export const booksRouter = express.Router();

booksRouter.get("/", getBooks);
booksRouter.get("/:id", getBookById);
booksRouter.post("/", validateBook, createBook);
booksRouter.delete("/:id", deleteBook);
booksRouter.patch("/:id", validateBookPatchMethod, patchLogic);
booksRouter.put("/:id", validateBook, putLogic);
