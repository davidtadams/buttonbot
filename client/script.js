var socket = io();

// socket.on('pizza', function(message) {
//   console.log('Look at these jackals stealing pizza');
//   console.log(message);
// });

socket.on('button', function(position) {
  document.getElementById('status').innerText = position;
});
