const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const cors = require('cors');

const { newUser, deleteUser, getUser, usersInRoom } = require('./userControls');

const router = require('./router');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(cors());
app.use(router);

io.on('connect', (socket) => {
  socket.on('join', ({ name, room }, callback) => {
    const { error, user } = newUser({ id: socket.id, name, room });
    if(error) {
      return callback(error)
    };
    socket.join(user.room);

    socket.emit('message', { 
      user: 'admin', 
      text: `${user.name}, welcome to room ${user.room}.`
    });
    socket.broadcast.to(user.room).emit('message', { 
      user: 'admin', 
      text: `${user.name} has joined!` 
    });

    io.to(user.room).emit('roomData', { 
      room: user.room, 
      users: usersInRoom(user.room) 
    });

    callback();
  });

  socket.on('sendMessage', (message, callback) => {
    const user = getUser(socket.id);

    io.to(user.room).emit('message', { 
      user: user.name, 
      text: message 
    });

    callback();
  });

  socket.on('disconnect', () => {
    const user = deleteUser(socket.id);

    if(user) {
      io.to(user.room).emit('message', { 
        user: 'admin', 
        text: `${user.name} has left.` 
      });
      io.to(user.room).emit('roomData', { 
        room: user.room, 
        users: usersInRoom(user.room)
      });
    }
  })
});

server.listen(process.env.PORT || 5000);