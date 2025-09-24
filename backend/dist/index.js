"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const auth_1 = __importDefault(require("./routes/auth"));
const images_1 = __importDefault(require("./routes/images"));
const path_1 = __importDefault(require("path")); // <-- import after routes
const app = (0, express_1.default)(); // <-- declare app first
// Middleware
app.use((0, helmet_1.default)());
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({ origin: ["http://localhost:5173", "https://carrot801.github.io",], credentials: true }));
app.use((0, express_rate_limit_1.default)({ windowMs: 60000, max: 60 }));
app.use("/uploads", express_1.default.static(path_1.default.join(__dirname, "..", "uploads")));
// Routes
app.use("/api/auth", auth_1.default);
app.use("/api/images", images_1.default); // <-- use routes after app is declared
const PORT = 4000;
app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
});
