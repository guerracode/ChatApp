const express = require('express');
const socket = require('socket.io');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

const server = app.listen('3001', () => {
  console.log('Server running on http://localhost:3001');
});

io = socket(server);

io.on('connection', (socket) => {
  console.log(socket.id);

  socket.on('join_room', (data) => {
    socket.join(data);
    console.log(`User Join Room: ${data}`);
  });

  socket.on('disconnect', () => {
    console.log('USER DISCONNECTED');
  });
});
