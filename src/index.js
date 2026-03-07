import express from "express";
import fs from "node:fs/promises";
const ERRORS = {
  INVALID_DATA: {
    status: 400,
    message: "Wrong data were sent.",
  },
  BOOK_NOT_FOUND: {
    status: 404,
    message: "Book not found!",
  },
  INVALID_PAGINATION: {
    status: 400,
    message: "Invalid page or limit number",
  },
  SEARCH_EMPTY: {
    status: 200,
    message: "Searched query does not exist",
  },
};
const app = express();

app.use((req, res, next) => {
  const time = new Date().toLocaleString();
  console.log("Time of request: " + time);
  console.log("Req method: " + req.method);
  console.log("Url of the request: " + req.url);
  next();
});

app.use(express.json());

const validateBook = (req, res, next) => {
  const sentBody = req.body;

  if (
    typeof sentBody.title !== "string" ||
    typeof sentBody.author !== "string" ||
    typeof sentBody.year !== "number"
  ) {
    return next(ERRORS.INVALID_DATA);
  } else {
    req.body = {
      title: sentBody.title,
      author: sentBody.author,
      year: sentBody.year,
    };
    next();
  }
};

const validateBookPatchMethod = (req, res, next) => {
  const sentBody = req.body;
  const keys = Object.keys(sentBody);

  if (keys.length < 4) {
    if ("author" in sentBody) {
      if (typeof sentBody.author !== "string") {
        return next(ERRORS.INVALID_DATA);
      }
    }

    if ("title" in sentBody) {
      if (typeof sentBody.title !== "string") {
        return next(ERRORS.INVALID_DATA);
      }
    }

    if ("year" in sentBody) {
      if (typeof sentBody.year !== "number") {
        return next(ERRORS.INVALID_DATA);
      }
    }
    for (let i = 0; keys.length > i; i++) {
      if (keys[i] === "author" || keys[i] === "title" || keys[i] === "year") {
      } else {
        return next(ERRORS.INVALID_DATA);
      }
    }
    if (keys.length === 0) {
      return next(ERRORS.INVALID_DATA);
    }
    next();
  } else {
    return next(ERRORS.INVALID_DATA);
  }
};

app.get("/books", async (req, res, next) => {
  let filteredBooks = [...inMemoryArr];

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
});
app.get("/books/:id", (req, res, next) => {
  const reqUrlId = req.params.id;
  const foundBookByID = inMemoryArr.find((book) => {
    return book.id === Number(reqUrlId);
  });
  if (foundBookByID) {
    res.json(foundBookByID);
  } else {
    return next(ERRORS.BOOK_NOT_FOUND);
  }
});
app.post("/books", validateBook, (req, res) => {
  let dataFromClient = req.body;
  dataFromClient = {
    id: inMemoryArr[inMemoryArr.length - 1].id + 1,
    ...dataFromClient,
  };
  inMemoryArr = [...inMemoryArr, dataFromClient];
  res.status(201).json(dataFromClient);
});

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
