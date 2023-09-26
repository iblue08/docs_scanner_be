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
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
dotenv_1.default.config();
const app = (0, express_1.default)();
const allowedOrigins = [
    "http://localhost:3001",
    "http://192.168.1.4:3001",
    "http://localhost:3000",
    "https://docs-scanner-606c2.web.app"
];
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: allowedOrigins,
        methods: ["GET", "POST"],
    },
});
io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`);
    socket.on("join_room", (data) => {
        socket.join(data);
    });
    socket.on("send_state", (data) => {
        console.log("triggered send", data);
        socket.to(data.room).emit("receive_state", data);
    });
    socket.on("reset_state", (data) => {
        console.log("triggered send", data);
        socket.to(data.room).emit("receive_reset_state", data);
    });
    socket.on("send_image_list", (data) => {
        console.log("triggered image list send", data);
        socket.to(data.room).emit("receive_image_list", data);
    });
});
const port = process.env.PORT;
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
server.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
