var http = require('http');

var server = http.createServer(function(req, res){
  console.log('new request');
  res.writeHead(200, {
    'Content-Type': 'text/plain'
  });
  res.write('Hello World');
  res.end();
}).listen(8000)
