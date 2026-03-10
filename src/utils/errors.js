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
  SOMETHING_WENT_WRONG: {
    status: 500,
    message: "Something went wrong. Please try again.",
  },
  USER_DOES_NOT_EXIST: {
    status: 401,
    message: "User does not exist.",
  },
  FORBIDDEN: {
    status: 403,
    message: "Access forbidden. Invalid or expired token.",
  },
};
export default ERRORS;
