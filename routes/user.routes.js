import { Router } from "express";
import {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  createUser,
  getUserBySupabaseId,
  getCoach,
} from "../controllers/user.controller.js";
import { authorizeAdmin } from "../middlewares/auth.middleware.js";
const userRouter = Router();

userRouter.get("/", getUsers);

userRouter.get("/coach", getCoach);

userRouter.get("/supabase/:supabaseId", getUserBySupabaseId);

userRouter.get("/:id", getUserById);

userRouter.post("/", createUser);

userRouter.put("/:id", updateUser);

userRouter.delete("/:id", deleteUser);


export default userRouter;
