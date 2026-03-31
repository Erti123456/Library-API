import bcrypt from "bcrypt";
import ERROR from "../utils/errors.js";
import jwt from "jsonwebtoken";
import {
  saveUser,
  findUserByUsername,
} from "../repositories/userRepository.js";

export const registerUser = async (username, password) => {
  try {
    const existingUser = await findUserByUsername(username);
    if (existingUser) {
      throw ERROR.INVALID_DATA;
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      username: username,
      password: hashedPassword,
    };
    await saveUser(newUser);
    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      },
    );
    return token;
  } catch (err) {
    if (err.status) {
      throw err;
    } else {
      throw ERROR.SOMETHING_WENT_WRONG;
    }
  }
};

export const loginUser = async (username, password) => {
  try {
    const user = await findUserByUsername(username);
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
        expiresIn: "7d",
      },
    );
    return token;
  } catch (err) {
    if (err.status) {
      throw err;
    } else {
      throw ERROR.SOMETHING_WENT_WRONG;
    }
  }
};
