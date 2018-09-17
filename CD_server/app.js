const express = require("express");
const child_process = require("child_process");
const bp = require("body-parser");

const app = express();

app.use(bp.json());
app.use(bp.urlencoded({extended:false}));




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


app.listen(6666,()=>console.log("CD server listening on port 6666"));