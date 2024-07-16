//creating http server by using http module
const http = require("http");
const myServer=http.createServer((req,res) => 
{
    console.log("New request");
    res.end("Hello from Server");
});
myServer.listen(8000,() => console.log("Server Started"));
