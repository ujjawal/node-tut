var http = require('http');
var fs = require('fs');
var sys = require('util');

var file_path = __dirname + '/http.js';

fs.stat(file_path, function(err, stat){

  if (err) {
    throw err;
  }

  http.createServer(function(req, res){
    res.writeHead(200, {
      'Content-Type':'text/plain',
      'Content-Length': stat.size
    });

    rs = fs.createReadStream(file_path);
    sys.pump(rs, res, function(err){
      if(err){
        throw err;
      }
    });

  }).listen(4000);
});


