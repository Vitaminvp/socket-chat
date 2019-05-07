const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const Moniker = require('moniker');
const app = express();
const server = http.Server(app);
const port = process.env.PORT || 3000;
const io = socketIO(server);

const usersList = {};
const usersTyping = {};

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/client/index.html');
});

app.use(express.static('./client'));

server.listen(port, () => {
    console.log('listening on *:' + port);
});

io.on('connection', socket => {
    console.log(socket.id);
    socket.username = Moniker.choose();
    usersList[socket.id] = socket.username;

    socket.emit('set username', {name: socket.username, date: new Date()});

    socket.broadcast.emit('user joined', {name: socket.username, date: new Date()});

    socket.on('disconnect', () => {
        delete usersList[socket.id];
        socket.broadcast.emit('users list', {usersList});
        socket.broadcast.emit('user left', {name: socket.username, date: new Date()});
    });

    socket.on('chat message', message => {
        //io.emit('chat message', {message, name: socket.username, date: new Date()});
        socket.broadcast.emit('chat message', {message, name: socket.username, date: new Date()});
        socket.emit('own message', {status: 'delivered', message, name: socket.username, date: new Date()});
    });

    socket.on('typing', message => {
        usersTyping[socket.id] = socket.username;
        setTimeout(() => {
            delete usersTyping[socket.id]
        }, 2000);
        socket.broadcast.emit('typing', {names: usersTyping, message})
    });

    socket.on('change name', newName => {

        const oldName = socket.username;
        socket.username = newName;
        usersList[socket.id] = socket.username;

        io.emit('users list', {usersList});
        socket.emit('set username', {name: socket.username, date: new Date()});
        socket.broadcast.emit('user change name', {name: oldName, newName: socket.username, date: new Date()});

    });

    io.emit('users list', {usersList});

});
