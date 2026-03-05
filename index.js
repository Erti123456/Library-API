import express from "express";
let inMemoryArr = [
  {
    id: 1,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    year: 1925,
  },
  { id: 2, title: "1984", author: "George Orwell", year: 1949 },
  { id: 3, title: "To Kill a Mockingbird", author: "Harper Lee", year: 1960 },
  {
    id: 4,
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    year: 1951,
  },
  { id: 5, title: "The Hobbit", author: "J.R.R. Tolkien", year: 1937 },
  { id: 6, title: "Pride and Prejudice", author: "Jane Austen", year: 1813 },
  { id: 7, title: "Brave New World", author: "Aldous Huxley", year: 1932 },
  { id: 8, title: "Moby-Dick", author: "Herman Melville", year: 1851 },
  { id: 9, title: "War and Peace", author: "Leo Tolstoy", year: 1869 },
  { id: 10, title: "Ulysses", author: "James Joyce", year: 1922 },
  {
    id: 11,
    title: "The Grapes of Wrath",
    author: "John Steinbeck",
    year: 1939,
  },
  {
    id: 12,
    title: "One Hundred Years of Solitude",
    author: "Gabriel García Márquez",
    year: 1967,
  },
  { id: 13, title: "Wuthering Heights", author: "Emily Brontë", year: 1847 },
  { id: 14, title: "Invisible Man", author: "Ralph Ellison", year: 1952 },
];
const app = express();

app.use(express.json());

app.get("/books", (req, res) => {
  let filteredBooks = inMemoryArr;

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
    return res.json({ message: "Invalid page or limit number" });
  }

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  filteredBooks = filteredBooks.slice(startIndex, endIndex);

  if (filteredBooks.length === 0 && Object.keys(req.query).length > 0) {
    res.json({ message: "Searched query does not exist" });
  } else {
    res.json(filteredBooks);
  }
});
app.get("/books/:id", (req, res) => {
  const reqUrlId = req.params.id;
  const foundBookByID = inMemoryArr.find((book) => {
    return book.id === Number(reqUrlId);
  });
  if (foundBookByID) {
    res.json(foundBookByID);
  } else {
    res.status(404).json({ errorMessage: "Book not found!" });
  }
});
app.post("/books", (req, res) => {
  let dataFromClient = req.body;
  dataFromClient = {
    id: inMemoryArr[inMemoryArr.length - 1].id + 1,
    ...dataFromClient,
  };
  inMemoryArr.push(dataFromClient);
  res.status(201).json(dataFromClient);
});

app.delete("/books/:id", (req, res) => {
  const reqUrlId = Number(req.params.id);
  inMemoryArr = inMemoryArr.filter((book) => book.id !== reqUrlId);
  res.status(204).json(inMemoryArr);
});

app.patch("/books/:id", (req, res) => {
  const reqUrlId = Number(req.params.id);
  const foundBookByID = inMemoryArr.find((book) => reqUrlId === book.id);
  if (foundBookByID) {
    Object.assign(foundBookByID, req.body);
    res.json(foundBookByID);
  } else {
    res.status(404);
  }
});

app.put("/books/:id", (req, res) => {
  const reqUrlId = Number(req.params.id);
  let index = inMemoryArr.findIndex((book) => reqUrlId === book.id);

  if (index !== -1) {
    inMemoryArr[index] = { id: reqUrlId, ...req.body };
    res.json(inMemoryArr[index]);
  } else {
    res.status(404);
  }
});

const PORT = 3000;
app.listen(PORT, () => console.log("The server runs on port: " + PORT));
