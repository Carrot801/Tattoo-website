import { Router } from "express";
import multer from "multer";
import { supabase } from "../lib/supabase";
import { requireAdmin } from "../middleware/auth";
import { PrismaClient, ImageType } from "@prisma/client";
import path from "path";
import fs from "fs";

const prisma = new PrismaClient();
const router = Router();

// Multer memory storage (keeps file in RAM)
const upload = multer({ storage: multer.memoryStorage() });
// ---------------- POST /api/images (ADMIN only) ----------------
router.post("/", requireAdmin, upload.single("image"), async (req, res) => {
    if (!req.file) return res.status(400).json({ error: "No image uploaded" });

    const { type, title, description } = req.body;

    const filePath = `${Date.now()}-${req.file.originalname}`;

    // Upload buffer to Supabase
    const { error: uploadError } = await supabase.storage
        .from("images")  // your bucket name
        .upload(filePath, req.file.buffer, {
            contentType: req.file.mimetype,
            upsert: false,
        });

    if (uploadError) return res.status(500).json({ error: uploadError.message });

    // Get public URL
    const { data } = supabase.storage.from("images").getPublicUrl(filePath);

    const image = await prisma.image.create({
        data: {
            type,
            title: title || null,
            description: description || null,
            url: data.publicUrl || "",
        },
    });

    res.json({ success: true, image });
});


// ---------------- PUT /api/images/reorder (ADMIN only) ----------------
router.put("/reorder", requireAdmin, async (req, res) => {
    try {
        const { order } = req.body;
        // Example: [{ id: 5, position: 0 }, { id: 7, position: 1 }]

        if (!Array.isArray(order)) {
            return res.status(400).json({ error: "Order must be an array" });
        }

        const updates = order.map((item) =>
            prisma.image.update({
                where: { id: item.id },
                data: { position: item.position },
            })
        );

        await Promise.all(updates);

        res.json({ success: true });
    } catch (err) {
        console.error("PUT /images/reorder error:", err);
        res.status(500).json({ error: "Failed to reorder images" });
    }
});

// ---------------- GET /api/images (public) ----------------
router.get("/", async (req, res) => {
    try {
        const images = await prisma.image.findMany();
        res.json(images);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
});

export default router;
