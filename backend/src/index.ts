import express from "express";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import cors from "cors";
import rateLimit from "express-rate-limit";

import authRouter from "./routes/auth";
import imageRouter from "./routes/images";
import path from "path"; // <-- import after routes

const app = express(); // <-- declare app first

// Middleware
app.use(helmet());
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: ["http://localhost:5173","https://carrot801.github.io",], credentials: true }));
app.use(rateLimit({ windowMs: 60_000, max: 60 }));
app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));

// Routes
app.use("/api/auth", authRouter);
app.use("/api/images", imageRouter); // <-- use routes after app is declared

const PORT = 4000;
app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
});
