const http = require("http");
const fs = require("fs");
const url = require("url");

const myServer = http.createServer((req, res) => {
    if (req.url === '/favicon.ico') return res.end();

    const log = `${Date.now()}: New request received\n`;
    const myUrl = url.parse(req.url, true);
    console.log(myUrl);

    fs.appendFile("login.txt", log, (err) => {
        if (err) {
            console.error("Failed to write to log file:", err);
            res.statusCode = 500;
            return res.end("Internal Server Error");
        }

        switch (myUrl.pathname) {
            case '/':
                res.end("Home Page");
                break;
            case '/about':
                res.end("This is the About Page");
                break;
            default:
                res.end("Not Found");
        }
    });
});

myServer.listen(3000, () => {
    console.log("Server is running on port 3000");
});
