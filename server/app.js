const express = require("express");
const socket = require("socket.io");
const app = express();
const child_process = require("child_process");
const bp = require("body-parser");


app.set("view engine","ejs");
app.use(express.static("static"));
app.use(bp.json());
app.use(bp.urlencoded({extended:false}));

app.get("/",(req,res)=>{
    res.render("peer");
});

app.get("/admin",(req,res)=>{
    res.render("baseStation");
});

app.get("/webhook/github",(req,res)=>{
    let sender = req.body.sender, branch = req.body.ref;

    if(branch.indexOf("master")>-1 && sender.login === "angadsharma1016"){
        child_process.exec("cd ../ && ./deploy",(err,stdout,stderr)=>{
            if(err){
                console.log(err);
                res.status(500);
            } else  
                res.status(200);
        });
    }
});


let server = app.listen(3000,"0.0.0.0",()=>console.log("Listening...."));

let io = socket(server);

io.sockets.on("connection",(client)=>{
    console.log(client.id);
    client.on("base station",(data)=>{
        io.sockets.emit("base station",data);
    });

    client.on("location",(data)=>{
        io.sockets.emit("location",{message:data.message,id:client.id});
    });

    client.on("chat",(data)=>{
        io.sockets.emit("chat",{message:data.message,id:client.id});
    });
}); 