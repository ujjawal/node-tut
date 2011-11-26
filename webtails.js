var http = require('http');
var spawn = require('child_process').spawn;

http.createServer(function(req, res){
  res.writeHead(200, {
    'Content-Type': 'text/plain'
  });

  var tail = spawn('tail', ['-f', '/var/log/syslog']);

  req.connection.on('end', function(){
    tail.kill();
  });

  tail.stdout.on('data', function(data){
    console.log(data.toString());
    res.write(data);
  });
}).listen(4000);
