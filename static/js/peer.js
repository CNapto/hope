const socket = io();

var x = document.getElementById("demo");

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else { 
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) {
    socket.emit("location",{message:`lat:${position.coords.latitude}\nlng:${position.coords.longitude}\n\n\n`});
    // x.innerHTML = "Latitude: " + position.coords.latitude + 
    // "<br>Longitude: " + position.coords.longitude;
}




$("#button1").on("click",(e)=>{
    e.preventDefault();
    getLocation();
});

$("#button2").on("click",(e)=>{
    e.preventDefault();
    socket.emit("chat",{message:$("#msg").val()});
});

socket.on("base station",(data)=>{
    alert(data.message);
 });


socket.on("chat",(data)=>{
    $("#chat").append("<p><strong>"+data.id+"</strong></p><p>"+data.message+"</p>");
});


