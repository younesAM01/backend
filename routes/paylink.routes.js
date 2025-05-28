import { Router } from "express";
import { createPaylinkInvoice, verifyPayment } from "../controllers/paylink.controller.js";

const paylinkRouter = Router();

paylinkRouter.post("/", createPaylinkInvoice);
paylinkRouter.get("/verify-payment/:invoiceId", verifyPayment);

export default paylinkRouter;