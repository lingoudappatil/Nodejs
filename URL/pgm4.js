const file= require('./External_File');
const http = require("http")
const server = http.createServer((req, res) => 
{
    res.end(file);
});

server.listen(8080, () => console.log("Server Started"));