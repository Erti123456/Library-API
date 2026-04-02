import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  clearToken,
  createBook,
  deleteBook,
  getBooks,
  hasToken,
  updateBook,
} from "../axios";

const emptyForm = {
  title: "",
  author: "",
  year: "",
};

function Bookshelf() {
  const [books, setBooks] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [page, setPage] = useState(1);
  const [pageInput, setPageInput] = useState("1");
  const [searchInput, setSearchInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [hasNextPage, setHasNextPage] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(hasToken());

  const loadBooks = useCallback(
    async (pageToLoad) => {
      setIsLoading(true);
      setError("");

      try {
        const data = await getBooks(pageToLoad, 6, {
          search: searchTerm,
          sortBy,
          order: sortOrder,
        });

        if (data.length === 0 && pageToLoad > 1) {
          setPage(1);
          return;
        }

        setBooks(data);
        setHasNextPage(data.length === 6);
      } catch (error) {
        setError(error.message);
        setBooks([]);
        setHasNextPage(false);
      } finally {
        setIsLoading(false);
      }
    },
    [searchTerm, sortBy, sortOrder],
  );

  useEffect(() => {
    loadBooks(page);
  }, [loadBooks, page]);

  useEffect(() => {
    setPageInput(String(page));
  }, [page]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((currentForm) => ({ ...currentForm, [name]: value }));
  };

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
  };

  const handlePageJump = (e) => {
    e.preventDefault();

    if (!pageInput.trim()) {
      setError("Enter a page number.");
      return;
    }

    const parsedPage = Number(pageInput);

    if (!Number.isInteger(parsedPage) || parsedPage < 1) {
      setError("Enter a valid page number.");
      setPage(1);
      return;
    }

    setError("");
    setPage(parsedPage);
  };

  const handleSearch = (e) => {
    e.preventDefault();

    const nextSearchTerm = searchInput.trim();

    if (!nextSearchTerm) {
      setError("Enter a book search.");
      return;
    }

    setError("");
    setPage(1);
    setSearchTerm(nextSearchTerm);
  };

  const handleClearSearch = () => {
    setSearchInput("");
    setSearchTerm("");
    setError("");
    setPage(1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const parsedYear = Number(form.year);

    if (
      !form.title.trim() ||
      !form.author.trim() ||
      !Number.isInteger(parsedYear)
    ) {
      setError("Fill in title, author, and a valid year.");
      return;
    }

    const payload = {
      title: form.title.trim(),
      author: form.author.trim(),
      year: parsedYear,
    };

    try {
      if (editingId) {
        await updateBook(editingId, payload);
        setSuccess("Book updated.");
        await loadBooks(page);
      } else {
        await createBook(payload);
        setSuccess("Book created.");
        setPage(1);
      }

      setIsAuthenticated(hasToken());
      resetForm();
    } catch (error) {
      setError(error.message);
      setIsAuthenticated(hasToken());
    }
  };

  const handleEditClick = (book) => {
    setEditingId(book.id);
    setForm({
      title: book.title,
      author: book.author,
      year: String(book.year),
    });
    setSuccess("");
    setError("");
  };

  const handleDeleteClick = async (id) => {
    setError("");
    setSuccess("");

    try {
      await deleteBook(id);
      setSuccess("Book deleted.");
      setIsAuthenticated(hasToken());

      if (books.length === 1 && page > 1) {
        setPage(page - 1);
        return;
      }

      await loadBooks(page);
    } catch (error) {
      setError(error.message);
      setIsAuthenticated(hasToken());
    }
  };

  const handleLogout = () => {
    clearToken();
    setIsAuthenticated(false);
    setSuccess("Token removed from local storage.");
    setError("");
  };

  return (
    <div className="relative z-10 min-h-screen overflow-y-auto px-4 py-10 text-white">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4">
        <div className="relative mx-auto w-full max-w-2xl rounded-3xl border border-white/10 bg-white/10 p-6 backdrop-blur-md">
          <div className="absolute right-6 top-6">
            <div className="flex flex-wrap gap-3">
              <Link
                to="/"
                className="rounded-2xl border border-white/20 px-4 py-3 text-sm font-semibold transition-colors hover:bg-white hover:text-black"
              >
                Home
              </Link>
              {isAuthenticated ? (
                <button
                  onClick={handleLogout}
                  className="rounded-2xl border border-red-300/30 px-4 py-3 text-sm font-semibold text-red-200 transition-colors hover:bg-red-400 hover:text-black"
                >
                  Sign Out
                </button>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="rounded-2xl border border-white/20 px-4 py-3 text-sm font-semibold transition-colors hover:bg-white hover:text-black"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    className="rounded-2xl border border-white/20 px-4 py-3 text-sm font-semibold transition-colors hover:bg-white hover:text-black"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
          <div className="pr-44">
            <p className="text-sm uppercase tracking-[0.35em] text-gray-300">
              Library Dashboard
            </p>
            <h1 className="mt-1 text-4xl font-bold md:text-5xl">Bookshelf</h1>
            <p className="mt-3 max-w-2xl text-sm text-gray-300">
              Browse 6 books at a time and use the form to create, update, or
              delete entries.
            </p>
          </div>
        </div>

        <div className="grid gap-4">
          <section className="mx-auto w-full max-w-2xl rounded-3xl border border-white/10 bg-white/10 p-6 backdrop-blur-md">
            <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-gray-400">
                  Current Page
                </p>
                <h2 className="mt-2 text-2xl font-semibold">Page {page}</h2>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() =>
                    setPage((currentPage) => Math.max(1, currentPage - 1))
                  }
                  disabled={page === 1 || isLoading}
                  className="rounded-2xl border border-white/20 px-4 py-3 text-sm font-semibold transition-colors hover:bg-white hover:text-black disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Previous
                </button>
                <button
                  onClick={() => setPage((currentPage) => currentPage + 1)}
                  disabled={!hasNextPage || isLoading}
                  className="rounded-2xl border border-white/20 px-4 py-3 text-sm font-semibold transition-colors hover:bg-white hover:text-black disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Next
                </button>
              </div>
            </div>

            <form onSubmit={handleSearch} className="mb-4 flex gap-3">
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search books"
                className="flex-1 rounded-2xl border border-white/20 bg-black/20 px-4 py-3 outline-none transition-colors focus:border-white"
              />
              <button
                disabled={!searchInput.trim()}
                className="rounded-2xl border border-white/20 px-4 py-3 text-sm font-semibold transition-colors hover:bg-white hover:text-black disabled:cursor-not-allowed disabled:opacity-40"
              >
                Search
              </button>
              {searchTerm && (
                <button
                  type="button"
                  onClick={handleClearSearch}
                  className="rounded-2xl border border-white/20 px-4 py-3 text-sm font-semibold transition-colors hover:bg-white hover:text-black"
                >
                  Clear
                </button>
              )}
            </form>

            <form onSubmit={handlePageJump} className="mb-6 flex gap-3">
              <input
                type="number"
                min="1"
                value={pageInput}
                onChange={(e) => setPageInput(e.target.value)}
                placeholder="Jump to page"
                className="flex-1 rounded-2xl border border-white/20 bg-black/20 px-4 py-3 outline-none transition-colors focus:border-white"
              />
              <button
                disabled={!pageInput.trim()}
                className="rounded-2xl border border-white/20 px-4 py-3 text-sm font-semibold transition-colors hover:bg-white hover:text-black disabled:cursor-not-allowed disabled:opacity-40"
              >
                Go
              </button>
            </form>

            <div className="mb-6 flex gap-3">
              <select
                value={sortBy}
                onChange={(e) => {
                  setSortBy(e.target.value);
                  setPage(1);
                }}
                className="flex-1 rounded-2xl border border-white/20 bg-black/20 px-4 py-3 outline-none transition-colors focus:border-white"
              >
                <option value="">No sort</option>
                <option value="title">Sort by title</option>
                <option value="author">Sort by author</option>
                <option value="year">Sort by year</option>
              </select>
              <select
                value={sortOrder}
                onChange={(e) => {
                  setSortOrder(e.target.value);
                  setPage(1);
                }}
                disabled={!sortBy}
                className="rounded-2xl border border-white/20 bg-black/20 px-4 py-3 outline-none transition-colors focus:border-white disabled:cursor-not-allowed disabled:opacity-40"
              >
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </select>
            </div>

            {isLoading ? (
              <div className="rounded-3xl border border-white/10 bg-black/20 p-8 text-center text-gray-300">
                Loading books...
              </div>
            ) : books.length === 0 ? (
              <div className="rounded-3xl border border-white/10 bg-black/20 p-8 text-center text-gray-300">
                {searchTerm
                  ? `No books found for "${searchTerm}".`
                  : "No books found on this page."}
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2">
                {books.map((book, index) => (
                  <article
                    key={book.id}
                    className="flex h-full flex-col rounded-3xl border border-white/10 bg-black/20 p-5"
                  >
                    <p className="text-xs uppercase tracking-[0.3em] text-gray-500">
                      Book #{(page - 1) * 6 + index + 1}
                    </p>
                    <p className="mt-3 text-lg font-semibold text-white">
                      Name:
                      <span className="font-normal">{book.title}</span>
                    </p>
                    <p className="mt-2 text-gray-300">
                      Author: <span className="text-white">{book.author}</span>
                    </p>
                    <p className="mt-1 text-sm text-gray-400">
                      Year: <span className="text-white">{book.year}</span>
                    </p>
                    <div className="mt-auto flex gap-3 pt-6">
                      <button
                        onClick={() => handleEditClick(book)}
                        disabled={!isAuthenticated}
                        className="flex-1 rounded-2xl border border-white/20 px-4 py-3 text-sm font-semibold transition-colors hover:bg-white hover:text-black disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        Update
                      </button>
                      <button
                        onClick={() => handleDeleteClick(book.id)}
                        disabled={!isAuthenticated}
                        className="flex-1 rounded-2xl border border-red-300/30 px-4 py-3 text-sm font-semibold text-red-200 transition-colors hover:bg-red-400 hover:text-black disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        Delete
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>

          <section className="mx-auto w-full max-w-2xl rounded-3xl border border-white/10 bg-white/10 p-6 backdrop-blur-md">
            <div className="mb-6">
              <p className="text-xs uppercase tracking-[0.3em] text-gray-400">
                Book Form
              </p>
              <h2 className="mt-2 text-2xl font-semibold">
                {editingId ? "Update Book" : "Add Book"}
              </h2>
              <p className="mt-2 text-sm text-gray-300">
                {isAuthenticated
                  ? "You have a token, so protected create, update, and delete requests can work."
                  : "Login or register first. The backend protects create, update, and delete routes with JWT auth."}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                name="title"
                type="text"
                value={form.title}
                onChange={handleChange}
                placeholder="Book title"
                className="rounded-2xl border border-white/20 bg-black/20 p-3 outline-none transition-colors focus:border-white"
                disabled={!isAuthenticated}
                required
              />
              <input
                name="author"
                type="text"
                value={form.author}
                onChange={handleChange}
                placeholder="Author"
                className="rounded-2xl border border-white/20 bg-black/20 p-3 outline-none transition-colors focus:border-white"
                disabled={!isAuthenticated}
                required
              />
              <input
                name="year"
                type="number"
                value={form.year}
                onChange={handleChange}
                placeholder="Year"
                className="rounded-2xl border border-white/20 bg-black/20 p-3 outline-none transition-colors focus:border-white"
                disabled={!isAuthenticated}
                required
              />
              <div className="flex gap-3">
                <button
                  disabled={!isAuthenticated}
                  className="flex-1 rounded-2xl bg-white px-4 py-3 font-semibold text-black transition-colors hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {editingId ? "Save Changes" : "Add Book"}
                </button>
                {editingId && (
                  <button
                    type="button"
                    onClick={resetForm}
                    disabled={!isAuthenticated}
                    className="rounded-2xl border border-white/20 px-4 py-3 font-semibold transition-colors hover:bg-white hover:text-black disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>

            {error && (
              <p className="mt-4 text-sm font-semibold text-red-400">{error}</p>
            )}
            {success && (
              <p className="mt-4 text-sm font-semibold text-emerald-300">
                {success}
              </p>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}

export default Bookshelf;
