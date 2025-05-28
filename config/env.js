import { config } from "dotenv";

config({ path: `.env.${process.env.NODE_ENV || "development"}.local` });

export const {
  PORT,
  NODE_ENV,
  DB_URI,
  JWT_SECRET,
  JWT_EXPIRES_IN,
  Email_PASSWORD,
  EMAIL_COMPANY_NAME,
  EMAIL_COMPANY_FROM,
  COMPANY_NAME,
  COMPANY_LOGO,
  COMPANY_ADDRESS,
  PRIMARY_COLOR,
  BACKEND_URL,
  RESEND_API_KEY,
  DASHBOARD_URL,
  PAYLINK_API_KEY,
  PAYLINK_SECRET_KEY,
  PAYLINK_BASE_URL,
  callBackUrl,
  cancelUrl,
} = process.env;