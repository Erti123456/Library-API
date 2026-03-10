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
import { authenticateToken } from "../middleware/auth.js";

export const booksRouter = express.Router();

booksRouter.get("/", getBooks);
booksRouter.get("/:id", getBookById);
booksRouter.post("/", authenticateToken, validateBook, createBook);
booksRouter.delete("/:id", authenticateToken, deleteBook);
booksRouter.patch(
  "/:id",
  authenticateToken,
  validateBookPatchMethod,
  patchLogic,
);
booksRouter.put("/:id", authenticateToken, validateBook, putLogic);
