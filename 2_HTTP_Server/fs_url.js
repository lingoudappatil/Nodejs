const http = require("http");
const fs = require("fs");
const myServer =  http.createServer((req,res)=>
{
    const log = '${Date.now()}:New request recieved\n';
    fs.appendFile("log.txt",log,(err,data)=>
    {
        switch(req.url)
        {
            case '/': res.end("Home Page");
            break
            case '/about': res.end("This about the Page");
            break
            default: res.end("Not Found");
        }
    });
});
myServer.listen(3000, () => 
    {
    console.log("Server is running on port 3000");
});
