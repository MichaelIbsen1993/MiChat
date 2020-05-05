const formatMessage = require('./utils/messages');

const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

io.on('connection', (socket) => {

    // current client.
    socket.emit('message', 'test');

    // all users except the current client.
    socket.broadcast.emit('message', formatMessage(socket.id, 'has joined the chat.'));

    // everyone.
    io.emit('message', formatMessage(socket.id, 'greetings everyone'));

    // when the client leaves.
    socket.on('disconnect', () => {
        io.emit('message', formatMessage(socket.id, 'has left the chat.'));
    });

    // catch image from user input.
    socket.on('chatMessage', message => { 
        io.emit('message', formatMessage(socket.id, message));
    });
});

// Render .html files from the public folder upon request.
app.use(express.static(path.join(__dirname, 'public')));

const port = process.env.PORT || 3000;;

server.listen(port, () => console.log(`server listening on port ${port}`));