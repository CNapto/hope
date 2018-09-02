const socket = io("http://localhost:3000");

$("button").on("click",(e)=>{
  e.preventDefault();
  socket.emit("base station",{message:$("#msg").val()});
});


socket.on("reply",(data)=>{
  $("#locations").append("<p>"+data.message+"</p>");
});