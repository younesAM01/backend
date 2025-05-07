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

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000", // your Next.js domain
    credentials: true,
  })
);

app.use("/api/coupons", couponRouter);
app.use("/api/reviews", reviewRouter);
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/packs", packRouter);
app.use("/api/clientpacks", clientPackRouter);
app.use("/api/sessions", sessionRouter);
app.use("/api/services", servicesRouter);
app.use("/api/coupons", couponRouter);
// app.use("/api/contact", contactRouter)

app.use(errorHandler);

app.get("/", (req, res) => {
  res.send("Backend is running");
});

app.listen(PORT, async () => {
  console.log(`Server Backend is running on http://localhost:${PORT}`);
  await connectDB();
});
