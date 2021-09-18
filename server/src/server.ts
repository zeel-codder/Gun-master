require('dotenv').config()
var express = require('express');
import {Request,Response} from 'express';
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
      origin: '*',
      methods: ["GET", "POST"],
      allowedHeaders: ["my-custom-header"],
      credentials: true
    }
  });



io.on("connection", (socket) => {

    // //console.log(socket.id)


    socket.on("AddUser",(id,fun)=>{

        const find:UserSchema=User.find((data)=>data.username ===id);

        // //console.log(find)
       
        if(!find && User.length<100){
            User.push({username:id,isJoin:false,id:socket.id});
            //console.log(User)
            socket.emit("UserNotFound",true);
            //console.log(fun())
            fun()
        }else{
            fun('User Found, Place try to User Another User Name')
            return true;
        }
    })


    socket.on("FindUser",(id)=>{




    })


    socket.on("UserFindAndJoin",(to,from,cb)=>{

        //console.log(User,Room)
        const UserData:UserSchema= User.find((data)=>data.username==to)
        const current:UserSchema=User.find((data)=>data.username==from);
        
        if(to!=from && UserData && !UserData.isJoin){
            io.emit('All',to,from);   
        }else{

            cb("User you Look For is Not Exits")

        }
    });

      
    socket.on("ChallengeAccepted",(to,from)=>{

        const UserData:UserSchema= User.find((data)=>data.username==to)
        const current:UserSchema=User.find((data)=>data.username==from);
             
        // Room.push(
        //     {
        //         id:socket.id,
        //         user1_id:current.id,
        //         user2_id:UserData.id,
        //         isAlive:true
        // })

        UserData.isJoin=true;
         current.isJoin=true;

        io.emit('EnterRoom',socket.id+"78",to,from);
    })
 

    socket.on("ChallengeAcceptedNotExcepted",(to,from)=>{
        const UserData:UserSchema= User.find((data)=>data.username==to)
        const current:UserSchema=User.find((data)=>data.username==from);
        io.emit("UserRefuse",from);
    })

    socket.on("JoinRoom",(roomId,name)=>{
        //console.log(name+" "+"Join")
        socket.join(roomId);
    })

    socket.on("ScoreChanged",(roomId,name,value)=>{

        socket.to(roomId).emit("UpdateScore",name,value);
    })


    socket.on("MathEnd",(roomId,value)=>{
        //console.log(value)
        socket.to(roomId).emit("EnemyMathEnd",roomId,value);
    })

    socket.on("MathEndBoth",(roomId,v1,v2)=>{
        socket.to(roomId).emit("YourEnd",roomId,v1,v2);
    })

    socket.on("Left-Room",(roomId,v1)=>{

        socket.leave(roomId);

        User.forEach((data,index)=>{
            if(data.username==v1){
                data.isJoin=false;
            }
        })
    })

    socket.on("disconnect", () => {
        
            User.forEach((data,index)=>{
                if(data.id==socket.id){
                    User.splice(index,1);
                }
            })
            // //console.log('User)
           
    });
});


app.get('/',(req:Request,res:Response) => {

    res.send("Running")
})


const port=process.env.PROT || 3000;

server.listen(port, () => {
  console.log(`Server app listening at http://localhost:${port}`)
})





