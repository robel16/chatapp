const { on } = require("events");
const express = require("express");
const path = require("path");

const app = express();

const PORT = process.env.PORT || 4000;

const server = app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});

const io = require("socket.io")(server);

app.use(express.static(path.join(__dirname, "public")));

let socketsConnected = new Set();

io.on("connection", onConnected);

function onConnected(socket) {
	console.log(socket.id);
	socketsConnected.add(socket.id);

    io.emit('client-total', socketsConnected.size)


    socket.on('disconnect',()=>{
        console.log(socket.id +  "disconnected")
        socketsConnected.delete(socket.id)
    io.emit('client-total', socketsConnected.size)

    })


    socket.on('message',(data)=>{
        console.log(data)
        socket.broadcast.emit('chat-message', data)
    })
}

