import fs from "node:fs/promises";
import ERRORS from "../utils/errors.js";
export const getBooks = async (req, res, next) => {
  try {
    const data = await fs.readFile("../../books.json", "utf-8");
    let filteredBooks = JSON.parse(data);
    if (req.query.author) {
      filteredBooks = filteredBooks.filter(
        (book) => book.author === req.query.author,
      );
    }

    if (req.query.year) {
      filteredBooks = filteredBooks.filter(
        (book) => book.year === Number(req.query.year),
      );
    }

    if (req.query.title) {
      filteredBooks = filteredBooks.filter(
        (book) => book.title === req.query.title,
      );
    }
    if (req.query.search) {
      filteredBooks = filteredBooks.filter((book) => {
        const searchTerms = req.query.search.toLowerCase();
        return (
          book.author.toLowerCase().includes(searchTerms) ||
          book.title.toLowerCase().includes(searchTerms) ||
          String(book.year).includes(searchTerms)
        );
      });
    }

    if (req.query.sortBy || req.query.order) {
      const whatToSortBy = req.query.sortBy;
      const whatOrderToSortBy = req.query.order || "asc";

      if (filteredBooks.length > 0) {
        if (typeof filteredBooks[0][whatToSortBy] === "string") {
          if (whatOrderToSortBy === "asc") {
            filteredBooks = filteredBooks.sort((a, b) =>
              a[whatToSortBy].localeCompare(b[whatToSortBy]),
            );
          } else if (whatOrderToSortBy === "desc") {
            filteredBooks = filteredBooks.sort((a, b) =>
              b[whatToSortBy].localeCompare(a[whatToSortBy]),
            );
          }
        } else {
          if (whatOrderToSortBy === "asc") {
            filteredBooks = filteredBooks.sort(
              (a, b) => a[whatToSortBy] - b[whatToSortBy],
            );
          } else if (whatOrderToSortBy === "desc") {
            filteredBooks = filteredBooks.sort(
              (a, b) => b[whatToSortBy] - a[whatToSortBy],
            );
          }
        }
      }
    }

    const page = req.query.page ? Number(req.query.page) : 1;
    const limit = req.query.limit ? Number(req.query.limit) : 5;

    if (
      isNaN(page) ||
      isNaN(limit) ||
      page < 1 ||
      limit < 1 ||
      !Number.isInteger(page) ||
      !Number.isInteger(limit) ||
      req.query.page === "0" ||
      req.query.limit === "0"
    ) {
      return next(ERRORS.INVALID_PAGINATION);
    }

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    filteredBooks = filteredBooks.slice(startIndex, endIndex);

    if (filteredBooks.length === 0 && Object.keys(req.query).length > 0) {
      return next(ERRORS.SEARCH_EMPTY);
    } else {
      res.json(filteredBooks);
    }
  } catch (err) {
    next(err);
  }
};
export const getBookById = async (req, res, next) => {
  try {
    const reqUrlId = req.params.id;
    const data = await fs.readFile("../../books.json", "utf-8");
    const books = JSON.parse(data);
    const foundBookByID = books.find((book) => {
      return book.id === Number(reqUrlId);
    });
    if (foundBookByID) {
      res.json(foundBookByID);
    } else {
      return next(ERRORS.BOOK_NOT_FOUND);
    }
  } catch (err) {
    next(err);
  }
};

export const createBook = async (req, res, next) => {
  try {
    const data = await fs.readFile("../../books.json", "utf-8");
    let books = JSON.parse(data);
    let dataFromClient = req.body;
    dataFromClient = {
      id: books[books.length - 1].id + 1,
      ...dataFromClient,
    };
    await fs.writeFile(
      "../../books.json",
      JSON.stringify([...books, dataFromClient], null, 2),
    );
    res.status(201).json(dataFromClient);
  } catch (err) {
    next(err);
  }
};

export const deleteBook = async (req, res, next) => {
  try {
    const reqUrlId = Number(req.params.id);
    const data = await fs.readFile("../../books.json", "utf-8");
    let books = JSON.parse(data);
    books = books.filter((book) => book.id !== reqUrlId);
    await fs.writeFile("../../books.json", JSON.stringify(books, null, 2));
    res.status(204).json(books);
  } catch (err) {
    next(err);
  }
};
