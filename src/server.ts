import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/authRoutes";
import noteRoutes from "./routes/noteRoutes";

const app = express();
app.use(cors());
app.use((req: Request, res: Response, next: NextFunction) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization"
  );
  next();
});
dotenv.config();
const port = process.env.PORT ? Number(process.env.PORT) : 8905;
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/notes", noteRoutes);
app.listen(port, () => {
  console.log("[server]: server is running on " + port);
});
