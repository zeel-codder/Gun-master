"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
var express = require("express");
var path = require("path");
var app = express();
var server = require("http").createServer(app);
var socket_io_1 = require("socket.io");
// interface RoomSchema{
//     id:string,
//     user1_id:string,
//     user2_id:string,
//     isAlive:boolean;
// }
var User = [];
// const Room :RoomSchema[]=[]
var io = new socket_io_1.Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true,
  },
});
io.on("connection", function (socket) {
  // //console.log(socket.id)
  socket.on("AddUser", function (id, fun) {
    var find = User.find(function (data) {
      return data.username === id;
    });
    // //console.log(find)
    if (!find && User.length < 100) {
      User.push({ username: id, isJoin: false, id: socket.id });
      //console.log(User)
      socket.emit("UserNotFound", true);
      //console.log(fun())
      fun();
      io.emit("TotalPlayerChange", User.length);
    } else {
      fun("User found, place try with another username");
      return true;
    }
  });
  socket.on("UserFindAndJoin", function (to, from, cb) {
    //console.log(User,Room)
    var UserData = User.find(function (data) {
      return data.username == to;
    });
    var current = User.find(function (data) {
      return data.username == from;
    });
    if (to != from && UserData && !UserData.isJoin) {
      io.emit("All", to, from);
    } else {
      cb("User is not exits or playing with onther user");
    }
  });
  socket.on("ChallengeAccepted", function (to, from) {
    var UserData = User.find(function (data) {
      return data.username == to;
    });
    var current = User.find(function (data) {
      return data.username == from;
    });
    // Room.push(
    //     {
    //         id:socket.id,
    //         user1_id:current.id,
    //         user2_id:UserData.id,
    //         isAlive:true
    // })
    UserData.isJoin = true;
    current.isJoin = true;
    var roomId = socket.id + "78";
    UserData.roomId = roomId;
    current.roomId = roomId;
    io.emit("EnterRoom", roomId, to, from);
  });
  socket.on("ChallengeAcceptedNotExcepted", function (to, from) {
    var UserData = User.find(function (data) {
      return data.username == to;
    });
    var current = User.find(function (data) {
      return data.username == from;
    });
    io.emit("UserRefuse", from);
  });
  socket.on("JoinRoom", function (roomId, name) {
    //console.log(name+" "+"Join")
    socket.join(roomId);
  });
  socket.on("ScoreChanged", function (roomId, name, value) {
    socket.to(roomId).emit("UpdateScore", name, value);
  });
  socket.on("MathEnd", function (roomId, value) {
    //console.log(value)
    socket.to(roomId).emit("EnemyMathEnd", roomId, value);
  });
  socket.on("MathEndBoth", function (roomId, v1, v2) {
    socket.to(roomId).emit("YourEnd", roomId, v1, v2);
  });
  socket.on("Left-Room", function (roomId, v1) {
    socket.leave(roomId);
    User.forEach(function (data, index) {
      if (data.username == v1) {
        data.isJoin = false;
        data.roomId = "";
      }
    });
  });
  socket.on("disconnect", function () {
    User.forEach(function (data, index) {
      if (data.id == socket.id) {
        console.log(data);
        if (data.isJoin) {
          socket.to(data.roomId).emit("EnemyMathEnd", data.roomId, -3);
        }
        User.splice(index, 1);
      }
    });
    // //console.log('User)
    io.emit("TotalPlayerChange", User.length);
  });
});
app.get("/", function (req, res) {
  res.send("Running");
});

if (process.env.NODE_ENV === "production") {
  var _a = process.env,
    _b = _a.PORT,
    PORT = _b === void 0 ? 3000 : _b,
    _c = _a.LOCAL_ADDRESS,
    LOCAL_ADDRESS = _c === void 0 ? "0.0.0.0" : _c;
  server.listen(PORT, LOCAL_ADDRESS, function () {
    var address = server.address();
    console.log("server listening at", address);
  });
} else {
  var port_1 = process.env.PROT || 5000;
  server.listen(port_1, function () {
    console.log("Server app listening at http://localhost:" + port_1);
  });
}

module.exports = server;
