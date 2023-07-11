'use strict';
const express = require('express')
const app = express();
const http = require('http')
const cors =require('cors')
const {Server} = require('socket.io')
const server = http.createServer(app)

app.use(cors())
const io = new Server(server,{
    cors:{
        origin: "http://localhost:3000",
        methods:["GET","POST"]
    }
})
io.on('connection',(socket)=>{
    console.log(`${socket.id} connected`);

    socket.on('disconnect',(socket)=>{
        console.log(`${socket.id} disconnected`);
    })
})


server.listen(3001,()=>{
    console.log('SERVER LISTENING');
})