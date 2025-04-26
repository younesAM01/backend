import { Router } from "express";
import { createSession, getAllSessions, getSessionById, updateSession, deleteSession } from "../controllers/session.controller.js";

const sessionRouter = Router();

sessionRouter.post("/", createSession);

sessionRouter.get("/", getAllSessions);

sessionRouter.get("/:id", getSessionById);

sessionRouter.put("/:id", updateSession);

sessionRouter.delete("/:id", deleteSession);

export default sessionRouter;
