const express = require("express");
const app = express();
const cors = require("cors");
const http = require("http").Server(app);
const PORT = process.env.port || 3000;
const socketIO = require("socket.io")(http, {
  cors: {
    origin: "*",
  },
});

app.use(cors());

socketIO.on("connection", (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);

  socket.on("test", (socket) => {
    socketIO.emit("test");
  });

  socket.on("disconnect", (socket) => {
    console.log(`⚡: ${socket.id} user just disconnected!`);
  });
});

app.get("/", (req, res) => {
  res.send("Hello Friend!");
});

http.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
