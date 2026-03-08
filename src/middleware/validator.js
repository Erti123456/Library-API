import ERRORS from "../utils/errors.js";
export const validateBook = (req, res, next) => {
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

export const validateBookPatchMethod = (req, res, next) => {
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
