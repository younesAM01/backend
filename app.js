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

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.NODE_ENV === 'production' 
      ? ['http://localhost:3000'] // Allow local frontend during development
      : 'http://localhost:3000',
    credentials: true,
  })
);

// Routes
app.use("/api/coupons", couponRouter);
app.use("/api/reviews", reviewRouter);
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/packs", packRouter);
app.use("/api/clientpacks", clientPackRouter);
app.use("/api/sessions", sessionRouter);
app.use("/api/services", servicesRouter);

// Error handling
app.use(errorHandler);

// Health check endpoint
app.get("/", async (req, res) => {
  try {
    // Check database connection
    const dbState = await connectDB();
    if (!dbState) {
      throw new Error("Database connection failed");
    }
    
    res.json({
      status: 'success',
      message: 'StayFit API is running',
      environment: process.env.NODE_ENV || 'development',
      database: 'connected'
    });
  } catch (error) {
    console.error('Health check failed:', error);
    res.status(500).json({
      status: 'error',
      message: 'Database connection failed',
      error: error.message,
      environment: process.env.NODE_ENV || 'development'
    });
  }
});

// Development server
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server Backend is running on http://localhost:${PORT}`);
  });
}

export default app;
