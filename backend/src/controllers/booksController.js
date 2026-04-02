import {
  queryBooks,
  fetchBookById,
  createBookService,
  updateBookService,
  patchBookService,
  deleteBookService,
} from "../services/bookServices.js";

export const getBooks = async (req, res, next) => {
  try {
    const filteredBooks = await queryBooks(req.query);
    res.json(filteredBooks);
  } catch (err) {
    next(err);
  }
};

export const getBookById = async (req, res, next) => {
  try {
    const book = await fetchBookById(req.params.id);
    res.json(book);
  } catch (err) {
    next(err);
  }
};

export const createBook = async (req, res, next) => {
  try {
    const newBook = await createBookService(req.body);
    res.status(201).json(newBook);
  } catch (err) {
    next(err);
  }
};

export const updateBook = async (req, res, next) => {
  try {
    const updatedBook = await updateBookService(req.params.id, req.body);
    res.json(updatedBook);
  } catch (err) {
    next(err);
  }
};

export const patchLogic = async (req, res, next) => {
  try {
    const updatedBook = await patchBookService(req.params.id, req.body);
    res.json(updatedBook);
  } catch (err) {
    next(err);
  }
};

export const putLogic = async (req, res, next) => {
  try {
    const updatedBook = await updateBookService(req.params.id, req.body);
    res.json(updatedBook);
  } catch (err) {
    next(err);
  }
};

export const deleteBook = async (req, res, next) => {
  try {
    await deleteBookService(req.params.id, req.user.id);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};
