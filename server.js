const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

io.on('connection', (socket) => {

    // current client.
    socket.emit('message', socket.id);

    // all users except the current client.
    socket.broadcast.emit('message', `${socket.id} joined the chat.`);

    // everyone.
    io.emit('message', socket.id);

    // when the client leaves.
    socket.on('disconnect', () => {
        io.emit('message', `${socket.id} left the chat`);
    });
});

// Render .html files from the public folder upon request.
app.use(express.static(path.join(__dirname, 'public')));

const port = process.env.PORT || 3000;;

server.listen(port, () => console.log(`server listening on port ${port}`));