import { Router } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = Router();

router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    // Replace with your real auth logic
    if (email !== "admin@example.com" || password !== "password") {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
        { id: "123", role: "ADMIN", email },
        process.env.JWT_SECRET || "dev-secret",
        { expiresIn: "1h" }
    );

    // Set the cookie
    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // true for HTTPS only
        sameSite: "lax", // or 'none' if cross-origin
        maxAge: 3600 * 1000, // 1 hour
    });

    res.json({ message: "Logged in" });
});

router.get("/me", (req,res) => {
    const token = req.cookies.token;
    if(!token) return res.status(401).json({error: "Not authenticated" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || "dev-secret");
        res.json({ user: decoded });
    } catch (err) {
        return res.status(401).json({ error: "Invalid token" });
    }
});

export default router;