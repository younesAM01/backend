import { Router } from "express";
import { signup, signin, signout, confirmEmail } from "../controllers/auth.controller.js";

const authRouter = Router();

authRouter.post("/sign-up", signup);

authRouter.post("/sign-in", signin);

authRouter.post("/sign-out", signout);

authRouter.get("/confirm-email/:token", confirmEmail);


export default authRouter;
