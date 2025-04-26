import { Router } from "express";
import { createClientPack, getAllClientPacks, getClientPackById, updateClientPack, deleteClientPack } from "../controllers/clientpack.controller.js";

const clientPackRouter = Router();

clientPackRouter.post("/", createClientPack);

clientPackRouter.get("/", getAllClientPacks);

clientPackRouter.get("/:id", getClientPackById);

clientPackRouter.put("/:id", updateClientPack);

clientPackRouter.delete("/:id", deleteClientPack);

export default clientPackRouter;


