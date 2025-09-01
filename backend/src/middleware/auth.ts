import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

declare global {
    namespace Express {
        interface Request {
            user?: JwtPayload & { id: string; role: string }; // match your JWT payload
        }
    }
}

export function requireAdmin(req: Request, res: Response, next: NextFunction) {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ error: "Unauthorized" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || "dev-secret") as any;
        if (decoded.role !== "ADMIN") return res.status(403).json({ error: "Forbidden" });
        req.user = decoded;
        next();
    } catch {
        return res.status(401).json({ error: "Invalid token" });
    }
}
