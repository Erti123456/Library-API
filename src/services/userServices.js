import bcrypt from "bcrypt";
import ERROR from "../utils/errors.js";
import jwt from "jsonwebtoken";
import { getAllUsers, saveUsers } from "../repositories/userRepository.js";

export const registerUser = async (username, password) => {
  try {
    const users = await getAllUsers();
    const userNameExists = users.find((user) => user.username === username);
    if (userNameExists) {
      throw ERROR.INVALID_DATA;
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      id: crypto.randomUUID(),
      username: username,
      password: hashedPassword,
    };
    await saveUsers([...users, newUser]);
  } catch (err) {
    if (err || err.message || err.status) {
      throw err;
    } else {
      throw ERROR.SOMETHING_WENT_WRONG;
    }
  }
};

export const loginUser = async (username, password) => {
  try {
    const users = await getAllUsers();
    const user = users.find((user) => user.username === username);
    if (!user) {
      throw ERROR.USER_DOES_NOT_EXIST;
    }
    const compare = await bcrypt.compare(password, user.password);
    if (!compare) {
      throw ERROR.INVALID_DATA;
    }
    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      },
    );
    return token;
  } catch (err) {
    if (err || err.message || err.status) {
      throw err;
    } else {
      throw ERROR.SOMETHING_WENT_WRONG;
    }
  }
};
