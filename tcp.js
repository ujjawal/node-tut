var net = require('net');
var carrier = require('carrier');

var connections = [];

net.createServer(function(conn) {

  connections.push(conn);

  conn.on('close', function(){
    var index = connections.indexOf(conn);
    if(index){
      connections.splice(index, 1);
    }
    return;
  });

  conn.write("Hello, welcome! \n");
  conn.write("Please enter your username to continue: \n");

  var username;

  carrier.carry(conn, function(line){
    if(!username){
      username = line;
      conn.write("Hello " + username + "!\n");
      return;
    }
    
    if(line == 'quit') {
      conn.end();
      return;
    }
    
    feedback = username + ": " + line + "\n";

    connections.forEach(function(c){
      c.write(feedback);
    });
  });

}).listen(4000);
