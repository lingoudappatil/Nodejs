const http = require("http");
const fs = require("fs");
const url = require("url");

const myServer = http.createServer((req, res) => {
    if (req.url === '/favicon.ico') return res.end();

    const log = `${Date.now()}: ${req.method} request received at ${req.url}\n`;
    const myUrl = url.parse(req.url, true);
    console.log(myUrl);

    fs.appendFile("requests.log", log, (err) => {
        if (err) {
            console.error("Failed to write to log file:", err);
            res.statusCode = 500;
            return res.end("Internal Server Error");
        }

        if (req.method === 'GET') {
            switch (myUrl.pathname) {
                case '/':
                    res.setHeader('Content-Type', 'text/plain');
                    res.end("Welcome to the Home Page");
                    break;
                case '/contact':
                    res.setHeader('Content-Type', 'text/plain');
                    res.end("Contact us at contact@example.com");
                    break;
                case '/data':
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify({ message: "Here is some JSON data" }));
                    break;
                default:
                    res.setHeader('Content-Type', 'text/plain');
                    res.statusCode = 404;
                    res.end("404 Not Found");
            }
        } else if (req.method === 'POST' && myUrl.pathname === '/logmessage') {
            let body = '';
            req.on('data', chunk => {
                body += chunk.toString();
            });
            req.on('end', () => {
                const messageLog = `${Date.now()}: Message received - ${body}\n`;
                fs.appendFile("messages.log", messageLog, (err) => {
                    if (err) {
                        console.error("Failed to write message to file:", err);
                        res.statusCode = 500;
                        return res.end("Internal Server Error");
                    }
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify({ status: "Message logged successfully" }));
                });
            });
        } else {
            res.setHeader('Content-Type', 'text/plain');
            res.statusCode = 405;
            res.end("Method Not Allowed");
        }
    });
});

myServer.listen(3000, () => {
    console.log("Server is running on port 3000");
});
