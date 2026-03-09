import express from "express";
import { loginUser, registerUser } from "../controllers/usersController.js";

export const usersRouter = express.Router();
usersRouter.post("/register", registerUser);
usersRouter.post("/login", loginUser);
