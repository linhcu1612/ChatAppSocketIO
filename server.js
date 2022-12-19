/** @format */

const express = require("express");
const bodyParser = require("body-parser");
const models = require("./models");
require("express-async-errors");
const morgan = require("morgan");
const errorhandler = require("errorhandler");
const cookieParser = require("cookie-parser");
const notifier = require("node-notifier");
const cors = require("cors");

const router = require("./routes/routes");
const config = require("./config/config");

const {
  ADD_MESSAGE,
  GET_ROOM,
  GET_MESSAGES,
  DELETE_MESSAGE,
} = require("./socketio");

const { JOIN_ROOM } = require("./socketEvents");

function errorNotification(err, str, req) {
  var title = "Error in " + req.method + " " + req.url;

  notifier.notify({
    title: title,
    message: str,
  });
}

const app = express();
app.use(morgan("dev"));
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: config.corsClientDomain,
  })
);
const http = require("http").Server(app);

const io = require("socket.io")(http, {
  cors: {
    origin: config.corsClientDomain,
    methods: ["GET", "POST"],
  },
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static("build"));
}

if (process.env.NODE_ENV === "development") {
  // only use in development
  app.use(errorhandler({ log: errorNotification }));
}
app.use(cookieParser(config.sessionSecret));

app.use("/", router);

io.on("connection", (socket) => {
  let currentRoomId = null;

  socket.on("disconnect", async () => {
    console.log("user disconnected");
  });

  socket.on("userJoined", async (data) => {
    console.log("user joined");
    currentRoomId = data;
    data.socketId = socket.id;
    JOIN_ROOM(socket, data);
    io.to(data).emit(
      "updateMessageList",
      JSON.stringify({
        messages: await GET_MESSAGES(data),
        conversation: await GET_ROOM(data),
      })
    );
  });

  socket.on("exitRoom", (data) => {
    currentRoomId = null;
    socket.leave(data);
  });

  socket.on("newMessage", async (data) => {
    const payload = JSON.parse(data);
    const res = await ADD_MESSAGE(payload);
    if (res !== null) {
      io.to(payload.conversation).emit(
        "updateMessageList",
        JSON.stringify({
          messages: await GET_MESSAGES(payload.conversation),
          conversation: await GET_ROOM(payload.conversation),
        })
      );
    }
    console.log("sent Message");
  });

  socket.on("deleteMessage", async (data) => {
    const payload = JSON.parse(data);
    const res = await DELETE_MESSAGE(payload);
    if (res !== null) {
      io.to(payload.conversation).emit(
        "updateMessageList",
        JSON.stringify({
          messages: await GET_MESSAGES(payload.conversation),
          conversation: await GET_ROOM(payload.conversation),
        })
      );
    }
    console.log("sent Message");
  });
});

http.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});

models.initDB();

app.use(bodyParser.json());
