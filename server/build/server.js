"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
var express = require('express');
var path = require('path');
var app = express();
var server = require('http').createServer(app);
var socket_io_1 = require("socket.io");
var User = [];
var Room = [];
var io = new socket_io_1.Server(server, {
    cors: {
        origin: 'https://kind-chandrasekhar-2359ab.netlify.app/',
    }
});
io.on("connection", function (socket) {
    // //console.log(socket.id)
    socket.on("AddUser", function (id, fun) {
        var find = User.find(function (data) { return data.username === id; });
        // //console.log(find)
        if (!find && User.length < 100) {
            User.push({ username: id, isJoin: false, id: socket.id });
            //console.log(User)
            socket.emit("UserNotFound", true);
            //console.log(fun())
            fun();
        }
        else {
            fun('User Found, Place try to User Another User Name');
            return true;
        }
    });
    socket.on("FindUser", function (id) {
    });
    socket.on("UserFindAndJoin", function (to, from, cb) {
        //console.log(User,Room)
        var UserData = User.find(function (data) { return data.username == to; });
        var current = User.find(function (data) { return data.username == from; });
        if (to != from && UserData && !UserData.isJoin) {
            io.emit('All', to, from);
        }
        else {
            cb("User you Look For is Not Exits");
        }
    });
    socket.on("ChallengeAccepted", function (to, from) {
        var UserData = User.find(function (data) { return data.username == to; });
        var current = User.find(function (data) { return data.username == from; });
        // Room.push(
        //     {
        //         id:socket.id,
        //         user1_id:current.id,
        //         user2_id:UserData.id,
        //         isAlive:true
        // })
        UserData.isJoin = true;
        current.isJoin = true;
        io.emit('EnterRoom', socket.id + "78", to, from);
    });
    socket.on("ChallengeAcceptedNotExcepted", function (to, from) {
        var UserData = User.find(function (data) { return data.username == to; });
        var current = User.find(function (data) { return data.username == from; });
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
            }
        });
    });
    socket.on("disconnect", function () {
        User.forEach(function (data, index) {
            if (data.id == socket.id) {
                User.splice(index, 1);
            }
        });
        // //console.log('User)
    });
});
var port = process.env.PROT || 3000;
server.listen(port, function () {
    console.log("Server app listening at http://localhost:" + port);
});
