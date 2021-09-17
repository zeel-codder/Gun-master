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
        origin: 'http://127.0.0.1:5500',
    }
});
io.on("connection", function (socket) {
    // console.log(socket.id)
    socket.on("AddUser", function (id) {
        var find = User.find(function (data) { return data.username === id; });
        // console.log(find)
        if (!find && User.length < 100) {
            User.push({ username: id, isJoin: false, id: socket.id });
            console.log(User);
            socket.emit("UserNotFound", true);
        }
        else {
            return true;
        }
    });
    socket.on("FindUser", function (id) {
    });
    socket.on("UserFindAndJoin", function (to, from) {
        console.log(User, Room);
        var UserData = User.find(function (data) { return data.username == to; });
        var current = User.find(function (data) { return data.username == from; });
        if (UserData && !UserData.isJoin) {
            io.emit('All', to, from);
        }
    });
    socket.on("ChallengeAccepted", function (to, from) {
        var UserData = User.find(function (data) { return data.username == to; });
        var current = User.find(function (data) { return data.username == from; });
        Room.push({
            id: socket.id,
            user1_id: current.id,
            user2_id: UserData.id,
            isAlive: true
        });
        socket.join(socket.id);
        io.emit('EnterRoom', socket.id);
    });
});
var port = 3000;
server.listen(port, function () {
    console.log("Server app listening at http://localhost:" + port);
});
