const fs=require("fs");
const http=require("http");
const url=require("url");

const server=http.createServer((req,res) =>
{
	if(req.url === '/favicon.ico')
	{
		return res.end();
	}
	const log=`${Date.now()}: ${req.url} Request Recieved\n`;
	fs.appendFile("log.txt",log,(err,data)=>
	{
		res.end("This is server message");
	});
	switch(req.url)
	{
		case '/':
		res.end("Home Page");
		break
		case '/about':
		res.end("About the Developer");
		break
		case '/career':
		res.end("Career Page");
		break
		default:
		res.end("Not Found");
		break
	}
		
});

server.listen(8000,()=>
{
	console.log("Started");
});