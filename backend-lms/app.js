import { configDotenv } from "dotenv";
configDotenv();
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import userRoutes from "./routes/user.routes.js";
import courseRoutes from "./routes/course.routes.js";
// import paymentRoutes from './routes/payment.routes.js';
import miscellaneousRoutes from "./routes/miscellaneous.routes.js";
import express from "express";
import connectToDb from "./config/db.config.js";
import errorMiddleware from "./middleware/error.middleware.js";
import { fileURLToPath } from 'url';
import path,{ dirname } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();

// middleware
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));
app.use(cors({ origin: [process.env.FRONTEND_URL], credentials: true }));

app.use("/user", userRoutes);
app.use("/courses", courseRoutes);
// app.use('/payments', paymentRoutes);
app.use("/", miscellaneousRoutes);

app.all("*", (req, res) => {
  res.status(404).send("OOPS!! 404 page not found");
});

app.use(errorMiddleware);

// db init
connectToDb();

export default app;
