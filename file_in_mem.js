var http = require('http');
var fs = require('fs');

var file_path = __dirname + '/http.js';

fs.stat(file_path, function(err, stat){

  if (err) {
    throw err;
  }

  fs.readFile(file_path, function(err, file_content){

    if (err) throw err;

    http.createServer(function(req, res){

      res.writeHead(200, {
        'Content-Type':'text/plain',
        'Content-Length': stat.size
      });
      
      res.end(file_content);

    }).listen(4000);
  });
});


