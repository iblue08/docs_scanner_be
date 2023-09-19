"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = require("body-parser");
const CounterRouter_1 = require("./routes/CounterRouter");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
const allowedOrigins = [
    "http://localhost:5173"
];
const options = {
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"]
};
app.use((0, cors_1.default)());
app.use((0, body_parser_1.json)());
app.use([CounterRouter_1.CameraRouter]);
mongoose_1.default
    .connect(process.env.MONGO_URL)
    .then(() => console.log("  Database connected 📟 "))
    .catch((err) => console.log(err));
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
