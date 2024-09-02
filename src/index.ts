import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectToDatabase } from "./connection";
import userRoutes from "./routes/user.route";
import chatRoutes from "./routes/chat.route";
import { errorMiddleware } from "./middlewares/error.middleware";
import cookieParser from "cookie-parser";
import path from "path";
dotenv.config();
const __dirname = path.resolve();
const app = express();
const PORT = process.env.PORT || 8000;

connectToDatabase();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});

//Routes
app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);

app.use(express.static(path.join(__dirname, "/client/dist")));

app.use("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

//error middleware
app.use(errorMiddleware);
