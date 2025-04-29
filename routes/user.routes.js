import { Router } from "express";
import {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  createUser,
  getUserBySupabaseId,
} from "../controllers/user.controller.js";
import { authorizeAdmin } from "../middlewares/auth.middleware.js";
const userRouter = Router();

userRouter.get("/", authorizeAdmin, getUsers);

userRouter.get("/:id", getUserById);

userRouter.get("/supabase/:supabaseId", getUserBySupabaseId);

userRouter.post("/", createUser);

userRouter.put("/:id", updateUser);

userRouter.delete("/:id", deleteUser);

export default userRouter;
