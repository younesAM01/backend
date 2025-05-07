import express from "express";
import cors from "cors";
import { PORT } from "./config/env.js";
import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";
import connectDB from "./database/mongodb.js";
import errorHandler from "./middlewares/error.middlware.js";
import cookieParser from "cookie-parser";
import packRouter from "./routes/pack.routes.js";
import clientPackRouter from "./routes/clientpack.routes.js";
import sessionRouter from "./routes/session.routes.js";
import servicesRouter from "./routes/services.routes.js";
import couponRouter from "./routes/coupon.route.js";
import reviewRouter from "./routes/review.route.js";
import contactRouter from "./routes/contact.routes.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Updated CORS configuration to work in both development and production
app.use(
  cors({
    origin: process.env.NODE_ENV === "production" 
      ? [
          "https://yourdomain.com", // Replace with your production domain
          "https://www.yourdomain.com", // Include www version if needed
        ] 
      : "http://localhost:3000",
    credentials: true,
  })
);

// Connect to database early for Vercel's serverless function
// This ensures the database connection is established on cold starts
connectDB().catch(console.error);

app.use("/api/coupons", couponRouter);
app.use("/api/reviews", reviewRouter);
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/packs", packRouter);
app.use("/api/clientpacks", clientPackRouter);
app.use("/api/sessions", sessionRouter);
app.use("/api/services", servicesRouter);
app.use("/api/contact", contactRouter);

app.use(errorHandler);

app.get("/", (req, res) => {
  res.send("Backend is running");
});

// Only start the server if we're not in production (not on Vercel)
// This prevents the app from trying to listen on a port in the serverless environment
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`Server Backend is running on http://localhost:${PORT}`);
  });
}

// This export is critical for Vercel serverless deployment
export default app;