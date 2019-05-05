const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const Moniker = require('moniker');

const app = express();
const server = http.Server(app);
const port = process.env.PORT || 3000;
const io = socketIO(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/client/index.html');
});

app.use(express.static('./client'));

server.listen(port, () => {
  console.log('listening on *:' + port);
});

io.on('connection', socket => {
  console.log(socket.id);
  //io.clients().connected();

  socket.username  = Moniker.choose();

  socket.emit('set username', {name: socket.username, date: new Date()});

  socket.broadcast.emit('user joined', {name: socket.username, date: new Date()});

  socket.on('disconnect', () => {
    socket.broadcast.emit('user left', {name: socket.username, date: new Date()});
  });

  socket.on('chat message', message => {
    io.emit('chat message', {message, name: socket.username, date: new Date()});
  });

  socket.on('typing', message => {
    socket.broadcast.emit('typing', { name: socket.username, message })
  });

  socket.on('stop typing', () => {
    socket.broadcast.emit('stop typing', {name: socket.username})
  });

});