import express from "express";
import {createServer} from "http";
import cors from "cors";
import { Server } from "socket.io"

const app = express();
app.use(cors());
app.use(express.json());
const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "https://chat-app-client-mu-roan.vercel.app/",
  }
});

io.on("connection", (socket) => {
  socket.on("join-room", (data) => {
    socket.join(data.roomId);
    socket.emit("joined-room", {roomId: data.roomId, name: data.name});
    console.log(`User joined room: ${data.roomId}, ${data.name}`);
  })    
  
  socket.on("send-message", (data) => {
    console.log(data.name, data.roomId, data.msg)
    io.to(data.roomId).emit("receive-message", data)
  })

})

server.listen(5000, () => {
    console.log("Server is running on port 5000");
})  
