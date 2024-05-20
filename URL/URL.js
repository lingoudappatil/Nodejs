const http = require("http");
const fs = require("fs");
const url = require("url");

const myServer =  http.createServer((req,res)=>
{
    if(req.url === '/favicon.ico') return res.end();
    const log = `${Date.now()}: ${req.url} New request received\n`;
    const myUrl = url.parse(req.url,true);
    console.log(myUrl); 
    fs.appendFile("log1.txt",log,(err,data)=>
    {
        switch(myUrl.pathname) // corrected req.pathname to myUrl.pathname
        {
            case '/': 
                res.end("Home Page");
                break;
            case '/about': 
			const username = myUrl.query.myname;
			res.end(`hii, ${username}`);
                break;
				
            default: 
                res.end("Not Found");
        }
    });
});

myServer.listen(3000, () => {
    console.log("Server is running on port 3000");
});