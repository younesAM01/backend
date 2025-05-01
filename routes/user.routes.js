import { Router } from "express";
import {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  createUser,
} from "../controllers/user.controller.js";
import { authorize, authorizeAdmin } from "../middlewares/auth.middleware.js";
const userRouter = Router();

userRouter.get("/", getUsers);

userRouter.get("/:id",  getUserById);

userRouter.post("/", createUser);

userRouter.put("/:id",  updateUser);

userRouter.delete("/:id",  deleteUser);

export default userRouter;
