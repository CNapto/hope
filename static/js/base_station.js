const socket = io();

$("button").on("click",(e)=>{
  e.preventDefault();
  socket.emit("base station",{message:$("#msg").val()});
});

socket.on("location",(data)=>{
  $("#locations").append("<p style='color:green'><strong>"+data.id+"</strong></p><p style='color:green'>"+data.message+"</p>");
});


socket.on("chat",(data)=>{
  $("#chat").append("<p><strong>"+data.id+"</strong></p><p>"+data.message+"</p>");
});