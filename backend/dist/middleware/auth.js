"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAdmin = requireAdmin;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function requireAdmin(req, res, next) {
    const token = req.cookies.token;
    if (!token)
        return res.status(401).json({ error: "Unauthorized" });
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || "dev-secret");
        if (decoded.role !== "ADMIN")
            return res.status(403).json({ error: "Forbidden" });
        req.user = decoded;
        next();
    }
    catch {
        return res.status(401).json({ error: "Invalid token" });
    }
}
