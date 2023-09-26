import express, { Express } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import { json } from "body-parser";
import { CameraRouter } from "./routes/CounterRouter";
import http from "http";
import {Server} from "socket.io";
import fs from "fs";

dotenv.config();

const app: Express = express();
const allowedOrigins = [
  "http://localhost:3001",
  "http://192.168.1.4:3001",
  "http://localhost:3000",
  "https://docs-scanner-606c2.web.app"
];

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin:allowedOrigins ,
    methods: ["GET", "POST"],
  },
});


io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("join_room", (data) => {
    socket.join(data);
  });

  socket.on("send_state", (data) => {
    console.log("triggered send",data);
    socket.to(data.room).emit("receive_state", data);
  });

  socket.on("reset_state", (data) => {
    console.log("triggered send",data);
    socket.to(data.room).emit("receive_reset_state", data);
  });

  socket.on("send_image_list", (data) => {
    console.log("triggered image list send",data);
    socket.to(data.room).emit("receive_image_list", data);
  });

});

const port = process.env.PORT!;

const options: cors.CorsOptions = {
  origin: allowedOrigins,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"]
};

app.use(cors());
app.use(json());
app.use([CameraRouter]);

mongoose
  .connect(process.env.MONGO_URL!)
  .then(() => console.log("  Database connected 📟 "))
  .catch((err) => console.log(err))


server.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});