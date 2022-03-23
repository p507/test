const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});




// const { Server } = require("socket.io");
// const io = new Server();
// const net = require('net');

// io.on('connection', (socket) => {
//   console.log('a user connected');
// });

// const client = net.createConnection({ port: 9898 }, () => {
//   console.log('CLIENT: I connected to the server.');
//   client.write('CLIENT: Hello this is client!');
// });

// client.on('data', (data) => {
//   console.log(data.toString());
//   client.end();
// });


// client.on('end', () => {
//   console.log('CLIENT: I disconnected from the server.');
// });



// io.listen(3000, ()=> {
//    console.log("listen to server");  
//   });

// const server = net.createServer((socket) => {
//   socket.on('data', (data) => {
//     console.log(data.toString());
//   })});