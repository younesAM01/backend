import { Router } from "express";
import { createService, getAllServices, getServiceById, updateService, deleteService } from "../controllers/services.controller.js";
import { authorizeAdmin } from "../middlewares/auth.middleware.js";

const servicesRouter = Router();

servicesRouter.post("/",authorizeAdmin, createService);

servicesRouter.get("/", getAllServices);

servicesRouter.get("/:id" , getServiceById);

servicesRouter.put("/:id", authorizeAdmin, updateService);

servicesRouter.delete("/:id", authorizeAdmin, deleteService);

export default servicesRouter;
