// const express = require("express");
// const path = require("path");

// const app = express();
// const server = require("http").createServer(app);

// const io = require("socket.io")(server);

// app.use(express.static(path.join(__dirname+"/public")));

// io.on("connection", function(socket){
//     socket.on("newuser", function(username){
//         socket.broadcast.emit("update",username + "joined the conversation");
//     });
//     socket.on("exituser", function(username){
//         socket.broadcast.emit("update",username + "left the conversation");
//     });
//     socket.on("chat", function(message){
//         socket.broadcast.emit("chat", message);
//     });
// });

// //server.listen(5000);
// const PORT = process.env.PORT || 5000;
// server.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// });
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serve static files if needed (e.g., HTML, CSS, JS files)
app.use(express.static('public'));

// Define routes (optional)
app.get('/', (req, res) => {
    res.send('Welcome to the Chatroom!');
});

// Set up socket.io connections
io.on('connection', (socket) => {
    console.log('A user connected');

    // Handle incoming messages
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg); // Broadcast the message to all clients
    });

    // Handle disconnection
    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

const PORT = process.env.PORT || 5000;
 server.listen(PORT, () => {
     console.log(`Server running on port ${PORT}`);
});