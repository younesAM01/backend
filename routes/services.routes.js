import { Router } from "express";
import { createService, getAllServices, getServiceById, updateService, deleteService } from "../controllers/services.controller.js";


const servicesRouter = Router();

servicesRouter.post("/", createService);

servicesRouter.get("/", getAllServices);

servicesRouter.get("/:id" , getServiceById);

servicesRouter.put("/:id",  updateService);

servicesRouter.delete("/:id",  deleteService);

export default servicesRouter;
