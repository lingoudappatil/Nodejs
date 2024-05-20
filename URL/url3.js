const http = require("http");
const fs = require("fs");
const url = require("url");

const myServer = http.createServer((req, res) => {
    if (req.url === '/favicon.ico') return res.end();

    const log = `${Date.now()}: ${req.method} request received at ${req.url}\n`;
    const myUrl = url.parse(req.url, true);
    console.log(myUrl);

    fs.appendFile("login.txt", log, (err) => {
        if (err) {
            console.error("Failed to write to log file:", err);
            res.statusCode = 500;
            return res.end("Internal Server Error");
        }

        if (req.method === 'GET') {
            switch (myUrl.pathname) {
                case '/':
                    res.setHeader('Content-Type', 'text/plain');
                    res.end("Home Page");
                    break;
                case '/about':
                    res.setHeader('Content-Type', 'text/plain');
                    res.end("This is the About Page");
                    break;
                case '/data':
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify({ message: "Here is your data" }));
                    break;
                default:
                    res.setHeader('Content-Type', 'text/plain');
                    res.end("Not Found");
            }
        } else if (req.method === 'POST' && myUrl.pathname === '/logdata') {
            let body = '';
            req.on('data', chunk => {
                body += chunk.toString();
            });
            req.on('end', () => {
                const userDataLog = `${Date.now()}: User Data - ${body}\n`;
                fs.appendFile("userdata.txt", userDataLog, (err) => {
                    if (err) {
                        console.error("Failed to write user data to file:", err);
                        res.statusCode = 500;
                        return res.end("Internal Server Error");
                    }
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify({ status: "Data logged successfully" }));
                });
            });
        } else {
            res.setHeader('Content-Type', 'text/plain');
            res.end("Not Found");
        }
    });
});

myServer.listen(3000, () => {
    console.log("Server is running on port 3000");
});
