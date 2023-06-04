import express from "express";
import { accessTokenValidator } from "../middleware/tokenValidator.js";

const userRouter = express.Router();

import {
  userRegister,
  loginUser,
  currentUser,
} from "../controllers/user.Controller.js";

userRouter.post("/register", userRegister);

userRouter.post("/login", loginUser);

userRouter.post("/current", accessTokenValidator, currentUser);

module.exports = userRouter;
