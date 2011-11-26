var http = require('http');
var fs = require('fs');
var step = require('step');

var file_path = __dirname + '/http.js';

step(
  function file_stat(){
    fs.stat(file_path, this)
  },
  function get_size(err, stat){
    size = stat.size;
    this();
  },
  function read_content(){
    fs.readFile(file_path, this)
  },
  function create_server(err, file_content){
     http.createServer(function(req, res){

      res.writeHead(200, {
        'Content-Type':'text/plain',
        'Content-Length': size
      });
      
      res.end(file_content);

    }).listen(4000);
  }
);

