require("dotenv").config();
var express = require("express");
import { Request, Response } from "express";
var path = require("path");
var app = express();
var server = require("http").createServer(app);

import { Server } from "socket.io";

interface UserSchema {
  id: string;
  username: string;
  isJoin: boolean;
  roomId?: string;
}

// interface RoomSchema{
//     id:string,
//     user1_id:string,
//     user2_id:string,
//     isAlive:boolean;
// }

const User: UserSchema[] = [];
// const Room :RoomSchema[]=[]

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  // //console.log(socket.id)

  socket.on("AddUser", (id: string, fun: Function) => {
    const find: UserSchema = User.find((data) => data.username === id);

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

  socket.on("UserFindAndJoin", (to: string, from: string, cb: Function) => {
    //console.log(User,Room)
    const UserData: UserSchema = User.find((data) => data.username == to);
    const current: UserSchema = User.find((data) => data.username == from);

    if (to != from && UserData && !UserData.isJoin) {
      io.emit("All", to, from);
    } else {
      cb("User is not exits or playing with onther user");
    }
  });

  socket.on("ChallengeAccepted", (to: string, from: string) => {
    const UserData: UserSchema = User.find((data) => data.username == to);
    const current: UserSchema = User.find((data) => data.username == from);

    // Room.push(
    //     {
    //         id:socket.id,
    //         user1_id:current.id,
    //         user2_id:UserData.id,
    //         isAlive:true
    // })

    UserData.isJoin = true;
    current.isJoin = true;

    const roomId: string = socket.id + "78";

    UserData.roomId = roomId;
    current.roomId = roomId;

    io.emit("EnterRoom", roomId, to, from);
  });

  socket.on("ChallengeAcceptedNotExcepted", (to: string, from: string) => {
    const UserData: UserSchema = User.find((data) => data.username == to);
    const current: UserSchema = User.find((data) => data.username == from);
    io.emit("UserRefuse", from);
  });

  socket.on("JoinRoom", (roomId: string, name: string) => {
    //console.log(name+" "+"Join")
    socket.join(roomId);
  });

  socket.on("ScoreChanged", (roomId: string, name: string, value: number) => {
    socket.to(roomId).emit("UpdateScore", name, value);
  });

  socket.on("MathEnd", (roomId: string, value: number) => {
    //console.log(value)
    socket.to(roomId).emit("EnemyMathEnd", roomId, value);
  });

  socket.on("MathEndBoth", (roomId: string, v1: number, v2: number) => {
    socket.to(roomId).emit("YourEnd", roomId, v1, v2);
  });

  socket.on("Left-Room", (roomId: string, v1: string) => {
    socket.leave(roomId);

    User.forEach((data, index) => {
      if (data.username == v1) {
        data.isJoin = false;
        data.roomId = "";
      }
    });
  });

  socket.on("disconnect", () => {
    User.forEach((data, index) => {
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

app.get("/", (req: Request, res: Response) => {
  res.send("Running");
});

if (process.env.NODE_ENV === "production") {
  const { PORT = 3000, LOCAL_ADDRESS = "0.0.0.0" } = process.env;
  server.listen(PORT, LOCAL_ADDRESS, () => {
    const address = server.address();
    console.log("server listening at", address);
  });
} else {
  const port = process.env.PROT || 3000;

  server.listen(port, () => {
    console.log(`Server app listening at http://localhost:${port}`);
  });
}
