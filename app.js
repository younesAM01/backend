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

const app = express();

// Add error handling for uncaught exceptions
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
});

process.on('unhandledRejection', (error) => {
  console.error('Unhandled Rejection:', error);
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  cors({
    origin: "*", // Allow all origins during development
    credentials: true,
  })
);

// Add a test route to check if the server is running
app.get("/test", (req, res) => {
  res.json({ message: "Server is running" });
});

app.use("/api/coupons", couponRouter);
app.use("/api/reviews", reviewRouter);
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/packs", packRouter);
app.use("/api/clientpacks", clientPackRouter);
app.use("/api/sessions", sessionRouter);
app.use("/api/services", servicesRouter);

app.use(errorHandler);

app.get("/", (req, res) => {
  res.send("Backend is running");
});

// Only start the server if we're not in a serverless environment
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, async () => {
    console.log(`Server Backend is running on http://localhost:${PORT}`);
    try {
      await connectDB();
      console.log('Database connected successfully');
    } catch (error) {
      console.error('Database connection error:', error);
    }
  });
}

export default app;
