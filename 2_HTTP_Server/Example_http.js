var http = require('http');

http.createServer(function (req, res) {
  // add a HTTP header:
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write('Server is Started\n');
  res.end("\n Hello World! ");
}).listen(8080,() => console.log("Go check on Server"));