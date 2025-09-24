"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const router = (0, express_1.Router)();
router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    // Replace with your real auth logic
    if (email !== "admin@example.com" || password !== "password") {
        return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = jsonwebtoken_1.default.sign({ id: "123", role: "ADMIN", email }, process.env.JWT_SECRET || "dev-secret", { expiresIn: "1h" });
    // Set the cookie
    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // true for HTTPS only
        sameSite: "lax", // or 'none' if cross-origin
        maxAge: 3600 * 1000, // 1 hour
    });
    res.json({ message: "Logged in" });
});
router.get("/me", (req, res) => {
    const token = req.cookies.token;
    if (!token)
        return res.status(401).json({ error: "Not authenticated" });
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || "dev-secret");
        res.json({ user: decoded });
    }
    catch (err) {
        return res.status(401).json({ error: "Invalid token" });
    }
});
exports.default = router;
