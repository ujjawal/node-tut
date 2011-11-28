var http = require('http');
var sys = require('util');
var fs = require('fs');

var server = http.createServer(function(req, res){
  res.writeHead(200, {
    'Content-Type': 'text/html'
  });

  var rs = fs.createReadStream(__dirname + '/template-socketio.html');
  sys.pump(rs, res);
});


var io = require('socket.io').listen(server);

io.sockets.on('connection', function(client){
  console.log('Connection event received')

  var username;
  client.emit('welcome', { data: 'Welcome to this chat server!\n' });
  client.emit('username', { data: 'Please enter your username to continue\n' });

  client.on('message', function(message){
    if(!username){
      username = message.data;
      client.send('Welcome ' + username + '!\n')
      return;
    }
    
    io.sockets.send(username + ': ' + message.data + '\n');
  });
});

server.listen(4000);
