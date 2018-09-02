const express = require("express");
const socket = require("socket.io");
const app = express();


app.set("view engine","ejs");
app.use(express.static("static"));

app.get("/",(req,res)=>{
    res.render("index");
});


let server = app.listen(3000,"0.0.0.0",()=>console.log("Listening...."));

let io = socket(server);

io.sockets.on("connection",(client)=>{
    client.emit("base station",{message:"we are coming to save you"});
    client.on("reply",(data)=>{
        console.log(data);
    });
}); 