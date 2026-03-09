import fs from "node:fs/promises";
import bcrypt from "bcrypt";
import ERROR from "../utils/errors.js";
import jwt from "jsonwebtoken";
export const registerUser = async (req, res, next) => {
  try {
    const username = req.body.username;
    const password = req.body.password;

    const data = await fs.readFile("./users.json", "utf-8");
    const userProfilesData = JSON.parse(data);
    const userNameExists = userProfilesData.find(
      (user) => user.username === username,
    );
    if (userNameExists) {
      return next(ERROR.INVALID_DATA);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      id: crypto.randomUUID(),
      username: username,
      password: hashedPassword,
    };

    await fs.writeFile(
      "./users.json",
      JSON.stringify([...userProfilesData, newUser], null, 2),
    );

    res.status(201).json({ message: "User registered!" });
  } catch (err) {
    next(err);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const username = req.body.username;
    const password = req.body.password;

    const data = await fs.readFile("./users.json", "utf-8");
    const usersList = JSON.parse(data);

    const user = usersList.find((user) => user.username === username);
    if (!user) {
      return next(ERROR.USER_DOES_NOT_EXIST);
    }
    const compare = await bcrypt.compare(password, user.password);
    if (!compare) {
      return next(ERROR.INVALID_DATA);
    }
    const token = jwt.sign(
      { id: user.id, username: user.username },
      "super-secret-key-123",
      {
        expiresIn: "1h",
      },
    );
    res.status(201).json({ token: token });
  } catch (err) {
    next(err);
  }
};
