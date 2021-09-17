require('dotenv').config()
var express = require('express');
var path = require('path');
var app = express();
var server = require('http').createServer(app); 

import { Server } from "socket.io";

interface UserSchema{
    id:string,
    username: string;
    isJoin:boolean;
}

interface RoomSchema{
    id:string,
    user1_id:string,
    user2_id:string,
    isAlive:boolean;
}

const User :UserSchema[]=[]
const Room :RoomSchema[]=[]

const io = new Server(server,{
    cors: {
      origin: 'http://127.0.0.1:5500',
    }
  });



io.on("connection", (socket) => {

    // console.log(socket.id)


    socket.on("AddUser",(id)=>{

        const find:UserSchema=User.find((data)=>data.username ===id);

        // console.log(find)
       
        if(!find && User.length<100){
            User.push({username:id,isJoin:false,id:socket.id});
            console.log(User)
            socket.emit("UserNotFound",true);
        }else{
            return true;
        }
    })


    socket.on("FindUser",(id)=>{




    })


    socket.on("UserFindAndJoin",(to,from)=>{

        console.log(User,Room)
        const UserData:UserSchema= User.find((data)=>data.username==to)
        const current:UserSchema=User.find((data)=>data.username==from);
        
        if(UserData && !UserData.isJoin){
            io.emit('All',to,from);   
        }
    });

      
    socket.on("ChallengeAccepted",(to,from)=>{

        const UserData:UserSchema= User.find((data)=>data.username==to)
        const current:UserSchema=User.find((data)=>data.username==from);
            
        Room.push(
            {
                id:socket.id,
                user1_id:current.id,
                user2_id:UserData.id,
                isAlive:true
        })
        socket.join(socket.id)
        io.emit('EnterRoom',socket.id);
    })
});





const port=3000;

server.listen(port, () => {
  console.log(`Server app listening at http://localhost:${port}`)
})





