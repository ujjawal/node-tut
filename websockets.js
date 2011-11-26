var http = require('http');
var sys = require('util');
var ws = require('./ws');
var fs = require('fs');

var clients = [];

http.createServer(function(req, res){
  res.writeHead(200, {
    'Content-Type': 'text/html'
  });

  var rs = fs.createReadStream(__dirname + '/template.html');
  sys.pump(rs, res);
}).listen(4000);

ws.createServer(function(websocket){
  var username;

  websocket.on('connect', function(resource){
    clients.push(websocket);
    websocket.write('Welcome to this chat server\n');
    websocket.write('Please enter your username to continue:\n')
  });

  websocket.on('data', function(data){
    if(!username) {
      username = data.toString();
      websocket.write('Welcome ' + username + '!\n')
      return;
    }

    feedback = username + ": " + data;
    clients.forEach(function(c){
      c.write(feedback);
    });
  });

  websocket.on('close', function(){
    var index = clients.indexOf(websocket);
    if(index >= 0){
      clients.splice(index, 1);
      return;
    }
  });
}).listen(8000);
