import { getAllBooks, saveBooks } from "../repositories/bookRepository.js";
import ERROR from "../utils/errors.js";

export const queryBooks = async (query) => {
  try {
    const allBooks = await getAllBooks();
    let filteredBooks = allBooks;
    if (query.author) {
      filteredBooks = filteredBooks.filter(
        (book) => book.author === query.author,
      );
    }

    if (query.year) {
      filteredBooks = filteredBooks.filter(
        (book) => book.year === Number(query.year),
      );
    }

    if (query.title) {
      filteredBooks = filteredBooks.filter(
        (book) => book.title === query.title,
      );
    }
    if (query.search) {
      filteredBooks = filteredBooks.filter((book) => {
        const searchTerms = query.search.toLowerCase();
        return (
          book.author.toLowerCase().includes(searchTerms) ||
          book.title.toLowerCase().includes(searchTerms) ||
          String(book.year).includes(searchTerms)
        );
      });
    }

    if (query.sortBy || query.order) {
      const whatToSortBy = query.sortBy;
      const whatOrderToSortBy = query.order || "asc";

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

    const page = query.page ? Number(query.page) : 1;
    const limit = query.limit ? Number(query.limit) : 5;

    if (
      isNaN(page) ||
      isNaN(limit) ||
      page < 1 ||
      limit < 1 ||
      !Number.isInteger(page) ||
      !Number.isInteger(limit) ||
      query.page === "0" ||
      query.limit === "0"
    ) {
      throw ERROR.INVALID_PAGINATION;
    }

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    filteredBooks = filteredBooks.slice(startIndex, endIndex);

    if (filteredBooks.length === 0 && Object.keys(query).length > 0) {
      throw ERROR.SEARCH_EMPTY;
    } else {
      return filteredBooks;
    }
  } catch (err) {
    if (err.status) throw err;
    throw ERROR.SOMETHING_WENT_WRONG;
  }
};

export const fetchBookById = async (id) => {
  try {
    const books = await getAllBooks();
    const foundBook = books.find((book) => book.id === Number(id));
    if (!foundBook) {
      throw ERROR.BOOK_NOT_FOUND;
    }
    return foundBook;
  } catch (err) {
    if (err.status) throw err;
    throw ERROR.SOMETHING_WENT_WRONG;
  }
};

export const createBookService = async (bookData) => {
  try {
    const books = await getAllBooks();
    const newBook = {
      id: books.length > 0 ? books[books.length - 1].id + 1 : 1,
      ...bookData,
    };
    await saveBooks([...books, newBook]);
    return newBook;
  } catch (err) {
    if (err.status) throw err;
    throw ERROR.SOMETHING_WENT_WRONG;
  }
};

export const updateBookService = async (id, bookData) => {
  try {
    let books = await getAllBooks();
    let found = false;
    const updatedBooks = books.map((book) => {
      if (book.id === Number(id)) {
        found = true;
        return { id: Number(id), ...bookData };
      }
      return book;
    });

    if (!found) {
      throw ERROR.BOOK_NOT_FOUND;
    }

    await saveBooks(updatedBooks);
    return { id: Number(id), ...bookData };
  } catch (err) {
    if (err.status) throw err;
    throw ERROR.SOMETHING_WENT_WRONG;
  }
};

export const patchBookService = async (id, bookData) => {
  try {
    let books = await getAllBooks();
    let updatedBook = null;
    const updatedBooks = books.map((book) => {
      if (book.id === Number(id)) {
        updatedBook = { ...book, ...bookData };
        return updatedBook;
      }
      return book;
    });

    if (!updatedBook) {
      throw ERROR.BOOK_NOT_FOUND;
    }

    await saveBooks(updatedBooks);
    return updatedBook;
  } catch (err) {
    if (err.status) throw err;
    throw ERROR.SOMETHING_WENT_WRONG;
  }
};

export const deleteBookService = async (id) => {
  try {
    let books = await getAllBooks();
    const bookExists = books.some((book) => book.id === Number(id));

    if (!bookExists) {
      throw ERROR.BOOK_NOT_FOUND;
    }

    const remainingBooks = books.filter((book) => book.id !== Number(id));
    await saveBooks(remainingBooks);
  } catch (err) {
    if (err.status) throw err;
    throw ERROR.SOMETHING_WENT_WRONG;
  }
};
