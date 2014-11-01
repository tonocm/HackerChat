var http = require('http')
var port = process.env.PORT || 80;
http.createServer(function(req, res) {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Welcome to HackerChat\nMade by Antonio and Edward in YHack 2014\n');
}).listen(port);
