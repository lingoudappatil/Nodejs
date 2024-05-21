const http = require("http");
const server=http.createServer((req,res) =>
{
	res.end("Server Stared");
});
server.listen(8000,() => console.log("Server Started"));