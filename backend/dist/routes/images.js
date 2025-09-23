"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const auth_1 = require("../middleware/auth");
const client_1 = require("@prisma/client");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const prisma = new client_1.PrismaClient();
const router = (0, express_1.Router)();
// Multer storage setup
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = "uploads/";
        if (!fs_1.default.existsSync(uploadDir))
            fs_1.default.mkdirSync(uploadDir);
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + path_1.default.extname(file.originalname));
    },
});
// Multer upload with file filter (TypeScript-safe)
const upload = (0, multer_1.default)({
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
router.post("/", auth_1.requireAdmin, upload.single("image"), async (req, res) => {
    try {
        if (!req.file)
            return res.status(400).json({ error: "No image uploaded" });
        const { type, title, description } = req.body;
        // Validate type
        if (!Object.values(client_1.ImageType).includes(type)) {
            return res.status(400).json({ error: "Invalid image type" });
        }
        const image = await prisma.image.create({
            data: {
                type: type,
                title: title || null,
                description: description || null,
                url: `/uploads/${req.file.filename}`, // serve via static
            },
        });
        res.json({ success: true, image });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
});
// ---------------- DELETE /api/images (ADMIN only) ----------------
router.delete("/:id", auth_1.requireAdmin, async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        const image = await prisma.image.findUnique({ where: { id } });
        if (!image)
            return res.status(404).json({ error: "Image not found" });
        const filePath = path_1.default.join(process.cwd(), "uploads", path_1.default.basename(image.url));
        fs_1.default.unlink(filePath, (err) => {
            if (err)
                console.warn("Failed to delete file from disk:", err);
        });
        await prisma.image.delete({ where: { id } });
        res.json({ message: "Image deleted" });
    }
    catch (err) {
        console.error("DELETE /images error:", err);
        res.status(500).json({ error: "Server error" });
    }
});
// ---------------- PUT /api/images/reorder (ADMIN only) ----------------
router.put("/reorder", auth_1.requireAdmin, async (req, res) => {
    try {
        const { order } = req.body;
        // Example: [{ id: 5, position: 0 }, { id: 7, position: 1 }]
        if (!Array.isArray(order)) {
            return res.status(400).json({ error: "Order must be an array" });
        }
        const updates = order.map((item) => prisma.image.update({
            where: { id: item.id },
            data: { position: item.position },
        }));
        await Promise.all(updates);
        res.json({ success: true });
    }
    catch (err) {
        console.error("PUT /images/reorder error:", err);
        res.status(500).json({ error: "Failed to reorder images" });
    }
});
// ---------------- GET /api/images (public) ----------------
router.get("/", async (req, res) => {
    try {
        const images = await prisma.image.findMany();
        res.json(images);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
});
exports.default = router;
