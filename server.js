const five = require('johnny-five');
const board = new five.Board();

const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;

const path = require('path');

app.use(express.static('client'));

app.get('/', function (req, res){
  res.sendFile(path.join(__dirname, '/client/index.html'));
});

board.on('ready', function () {
  var button = new five.Button(2);
  var timeDown = 0;

  button.on('down', function() {
    timeDown = 0;
    console.log('down');
    io.sockets.emit('button', 'down');
  });

  button.on('up', function() {
    console.log('up');
    io.sockets.emit('button', 'up');
  });

  button.on('hold', function() {
    console.log('Holding for ' + timeDown + ' seconds!');
    io.sockets.emit('button', 'Holding for ' + timeDown + ' seconds!');
    timeDown++;
  });
});

/* this was just testing a socket */
// io.on('connection', function() {
  // console.log('SOMEONE HAS CONNECTED!!!!!!');
  // io.sockets.emit('pizza', 'Hello from Node!');
// });

http.listen(port, function(){
  console.log('Your server is up and running on Port ' + port + '. Good job!');
});
