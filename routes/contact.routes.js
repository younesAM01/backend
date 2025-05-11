import { Router } from "express";
import contactController, { handleFreeSessionRequest } from "../controllers/contact.controller.js";

const contactRouter = Router();

contactRouter.post("/", contactController.sendContactEmail);
contactRouter.post("/free-session", handleFreeSessionRequest);

export default contactRouter;
