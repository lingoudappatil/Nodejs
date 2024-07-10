const http = require("http");
const url = require("url");

let data = {
             message: "Hello, world!" ,
             Name : "Lingouda" ,
	     Place : "Bangalore"
	    };

const myServer = http.createServer((req, res) => {
    if (req.url === '/favicon.ico') return res.end();

    const log = `${Date.now()}: New request received\n`;
    const myUrl = url.parse(req.url, true);
    console.log(myUrl);

    console.log(log);

    if (req.method === 'GET') {
        switch (myUrl.pathname) {
            case '/':
                res.setHeader('Content-Type', 'text/plain');
                res.end("Home Page");
                break;
            case '/data':
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify(data));
                break;
            default:
                res.setHeader('Content-Type', 'text/plain');
                res.end("Not Found");
        }
    } else if (req.method === 'POST' && myUrl.pathname === '/data') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            try {
                data = JSON.parse(body);
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ status: "Data updated successfully" }));
            } catch (e) {
                res.statusCode = 400;
                res.end("Invalid JSON");
            }
        });
    } else if (req.method === 'DELETE' && myUrl.pathname === '/data') {
        data = { message: "Hello, world!" };
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ status: "Data reset successfully" }));
    } else {
        res.setHeader('Content-Type', 'text/plain');
        res.end("Not Found");
    }
});

myServer.listen(3000, () => {
    console.log("Server is running on port 3000");
});
