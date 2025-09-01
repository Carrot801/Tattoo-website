import { Router } from "express";
import multer from "multer";
import { requireAdmin } from "../middleware/auth";
import { PrismaClient, ImageType } from "@prisma/client";
import path from "path";
import fs from "fs";

const prisma = new PrismaClient();
const router = Router();

// Multer storage setup
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = "uploads/";
        if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    },
});

// Multer upload with file filter (TypeScript-safe)
const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        if (!file.mimetype.startsWith("image/")) {
            // reject non-image files
            return cb(null, false); // multer-safe way
        }
        cb(null, true);
    },
});

// ---------------- POST /api/images (ADMIN only) ----------------
router.post("/", requireAdmin, upload.single("image"), async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ error: "No image uploaded" });

        const { type, title, description } = req.body;

        // Validate type
        if (!Object.values(ImageType).includes(type as ImageType)) {
            return res.status(400).json({ error: "Invalid image type" });
        }

        const image = await prisma.image.create({
            data: {
                type: type as ImageType,
                title: title || null,
                description: description || null,
                url: `/uploads/${req.file.filename}`, // serve via static
            },
        });

        res.json({ success: true, image });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
});
// ---------------- DELETE /api/images (ADMIN only) ----------------
router.delete("/:id",requireAdmin, async (req, res) => {
    try{
        const id = parseInt(req.params.id, 10);


        const image = await prisma.image.findUnique({ where: { id }});
        if(!image) return res.status(404).json({ error: "Image not found" });

        const filePath = path.join(process.cwd(), "uploads", path.basename(image.url));
        fs.unlink(filePath, (err) => {
            if (err) console.warn("Failed to delete file from disk:", err);
        });

        await prisma.image.delete({ where: {id}});

        res.json({ message: "Image deleted"});
    }catch(err) {
        console.error("DELETE /images error:", err);
        res.status(500).json({ error: "Server error" });
    }
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
