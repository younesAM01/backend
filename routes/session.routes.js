import { Router } from "express";
import { createSession, getAllSessions, getSessionById, updateSession, deleteSession, getSessionsByClientId, cancelSession, completeSession } from "../controllers/session.controller.js";

const sessionRouter = Router();

sessionRouter.post("/", createSession);

sessionRouter.get("/", getAllSessions);

sessionRouter.get("/:id", getSessionById);

sessionRouter.get("/client/:id", getSessionsByClientId);

sessionRouter.put("/:id", updateSession);

sessionRouter.put("/cancel/:id", cancelSession);

sessionRouter.put("/complete/:id", completeSession);

sessionRouter.delete("/:id", deleteSession);

export default sessionRouter;
