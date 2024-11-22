import express, { application } from "express";
import dotenv from "dotenv";
import dbConnect from "./lib/dbConnect.js";
import authRouter from "./routes/auth.routes.js";
import cookiesParser from "cookie-parser";
import msgRouter from "./routes/message.routes.js";

const app = express();
const PORT = process.env.PORT || 5000;

dotenv.config();
app.use(express.json());
app.use(cookiesParser());

dbConnect();
app.use("/api/auth", authRouter);

app.use("/api/message", msgRouter);
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
