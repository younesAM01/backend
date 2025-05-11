import { Router } from "express";
import { contactController, handleFreeSessionRequest } from "../controllers/contact.controller.js";
import { contactFormLimiter, freeSessionLimiter } from "../middlewares/rateLimite.middleware.js";

const contactRouter = Router();

contactRouter.post("/", contactFormLimiter,contactController);
contactRouter.post("/free-session", freeSessionLimiter, handleFreeSessionRequest);

export default contactRouter;
