const socket = require('socket.io');

module.exports = (server) => {
  io = socket(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
    },
  });

  io.on('connection', (socket) => {
    console.log('SocketID', socket.id);

    socket.on('join_room', (data) => {
      socket.join(data);
      console.log(`User Join Room: ${data}`);
    });

    socket.on('send_message', (data) => {
      console.log(data);
      socket.to(data.room).emit('receive_message', data.content);
    });

    socket.on('disconnect', () => {
      console.log('USER DISCONNECTED');
    });
  });
};
