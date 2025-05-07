// config/nodemailer.js
import nodemailer from "nodemailer";
import { Email_PASSWORD, EMAIL_COMPANY_FROM } from "./env.js";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: EMAIL_COMPANY_FROM,
    pass: Email_PASSWORD,
  },
});

export default transporter;
