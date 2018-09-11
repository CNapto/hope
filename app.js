const express = require("express");
const socket = require("socket.io");
const app = express();
const weatherdata=require('./helpers/weather');
require('dotenv').config();

app.set("view engine","ejs");
app.use(express.static("static"));

app.get("/",(req,res)=>{
    res.render("peer");
});

app.get("/admin",(req,res)=>{
    res.render("baseStation");
});

app.post('/weather',(req,res)=>{

weatherdata(req.body.lat,req.body.lon)
.then(res.send)
.catch(console.log);
});


let server = app.listen(3000,"0.0.0.0",()=>console.log("Listening...."));

let io = socket(server);

io.sockets.on("connection",(client)=>{
    console.log(client.id);

    client.on('join',(data)=>{
        console.log(data +" has joined");
        io.sockets.emit('userjoinedthechat',data);
    });
    
    client.on("base station",(data)=>{
        io.sockets.emit("base station",data);
    });

    client.on("location",(data)=>{
        io.sockets.emit("location",{message:data.message,id:client.id});
    });

    client.on("chat",(nickname,message)=>{
        console.log(nickname+" "+message);
         io.sockets.emit("chat",{"message":message,"senderNickname":nickname});
    });
    
    client.on('logout',(name)=>{
        console.log(name);
        client.broadcast.emit('logout',{"name":name});
    });

}); 