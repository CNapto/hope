const socket = io("http://localhost:3000");

socket.on("base station",(data)=>{
  alert(data.message);
});