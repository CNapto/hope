const socket = io("http://localhost:3000");


$("button").on("click",(e)=>{
    e.preventDefault();
    socket.emit("reply",{message:$("#msg").val()});
});


socket.on("base station",(data)=>{
    alert(data.message);
 });