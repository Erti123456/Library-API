import {
  registerUser as registerUserService,
  loginUser as loginUserService,
} from "../services/userServices.js";

export const registerUser = async (req, res, next) => {
  try {
    const username = req.body.username;
    const password = req.body.password;

    await registerUserService(username, password);

    res.status(201).json({ message: "User registered!" });
  } catch (err) {
    next(err);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const username = req.body.username;
    const password = req.body.password;

    const token = await loginUserService(username, password);

    res.status(200).json({ token: token });
  } catch (err) {
    next(err);
  }
};
