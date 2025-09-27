import { Router } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = Router();

router.post("/login",async (req, res) =>{
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email }});
    if (!user) return res.status(401).json({error: "Invalid credentials"});

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(401).json({error: "Invalid credentials"});

    const token = jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET || "dev-secret",
        { expiresIn: "2h" }
    );

    res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 3600 * 1000, // 1 hour
    });


    res.json({ success: true, token });
});

router.get("/me", (req,res) => {
    console.log("Cookies received:", req.cookies); // <-- add this line
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    if(!token) return res.status(401).json({error: "Not authenticated" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || "dev-secret");
        res.json({ user: decoded });
    } catch (err) {
        return res.status(401).json({ error: "Invalid token" });
    }
});


export default router;