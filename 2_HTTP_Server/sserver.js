const http = require("http");
const fs = require("fs");
const url = require("url");

const hostname = '127.0.0.1';
const port = 3000; 

const myServer = http.createServer((req, res) => {
    if (req.url === '/favicon.ico') return res.end();
    const log = `${Date.now()}: New request received\n`;
    const myUrl = url.parse(req.url, true);
    console.log(myUrl);
    fs.appendFile("log.txt", log, (err, data) => {
        if (err) {
            console.error("Error appending to log file:", err);
        }
        switch (myUrl.pathname) {
            case '/':
                res.end("Home Page");
                break;
            case '/about':
                res.end("This about the Page");
                break;
            default:
                res.end("Not Found");
        }
    });
});

myServer.listen(port, hostname, () => {
    console.log("Server is running on port", port);
    console.log(`Server is running at http://${hostname}:${port}/`);
});
