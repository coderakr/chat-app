import express from "express";
import cors from "cors";
import { clerkMiddleware } from "@clerk/express";
import connectDB from "./lib/db.js";

import "dotenv/config";

const app = express();
const PORT = process.env.PORT || 3001;
const FRONTEND_URL = process.env.FRONTEND_URL;

app.use(express.json());
app.use(cors({ origin: FRONTEND_URL, credentials: true }));
app.use(clerkMiddleware());

app.get("/", (req, res) => {
  res.send("server is running");
});

app.get("/health", (req, res) => {
  res.status(200).json({ ok: true });
});

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
  }
};

startServer();
