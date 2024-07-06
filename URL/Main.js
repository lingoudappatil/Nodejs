const file= require('./External_File');
const http = require("http")
const server = http.createServer((res,req) =>
{
	res.end('file');
}); 

server.listen(8000,() => console.log("Server Started"));
