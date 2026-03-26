import jwt from "jsonwebtoken";
import ERROR from "../utils/errors.js";

export const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return next(ERROR.FORBIDDEN);
  }
  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return next(ERROR.FORBIDDEN);
    }
    req.user = user;
    next();
  });
};
