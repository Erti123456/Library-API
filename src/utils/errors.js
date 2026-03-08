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
export default ERRORS;
