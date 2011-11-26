var http = require('http');
var fs = require('fs');

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

    rs.on('data', function(data){
      var flushed = res.write(data);
      if (!flushed) {
        rs.pause();
      }
    });

    res.on('drain', function(){
      rs.resume();
    });

    rs.on('end', function(){
      res.end();
    });

  }).listen(4000);
});


