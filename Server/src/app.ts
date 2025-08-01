import express, { Application, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import authRoutes from "./routes/auth";
import { errorHandler } from "./middleware/errorHandler";

const app: Application = express();

// Security middleware
app.use(helmet());

app.use(
  cors({
    origin: ["http://localhost:5173","https://t12resmartmarks.vercel.app"],
    credentials: true,
  })
);

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());

app.get("/", (req: Request, res: Response) => {
  res.send({ message: "Welcome to Smart Marks" });
});

// API Routes
app.use("/api/auth", authRoutes);

// Global error handler
app.use(errorHandler);

app.use((req: Request, res: Response) => {
  res.status(404).send({
    statusCode: 404,
    success: false,
    message: "Sorry, We can't find that!",
  });
});

export default app;
