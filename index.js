var http = require('node:http');
const { Server } = require("socket.io");
const express = require('express');

// Setup Server
const app = express();
const server = http.createServer({}, app);
const io = new Server(server);

app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
  res.render('index');
});

io.on('connection', (socket) => {
  console.log('>', socket.id);

  // io.emit('newPlayer', socket.id);
  io.emit('newPlayer', Array.from(io.sockets.sockets.keys()));

  socket.on('multiplayerMove', (data) => {
      io.emit('multiplayerMove', data);
  });

  socket.on('disconnect', () => {
      console.log('<', socket.id);
      io.emit('playerLeave', socket.id);
  });
});

server.listen(3000, () => {
    console.log(`[NODE] Server Started`);
    console.log('http://localhost:3000');
});