// app.js
const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;

  res.setHeader('Content-Type', 'text/plain');

  if (pathname === '/') {
    res.writeHead(200);
    res.end('Welcome to the Home Page!');
  } else if (pathname === '/about') {
    res.writeHead(200);
    res.end('Welcome to the About Page!');
  } else if (pathname === '/contact') {
    res.writeHead(200);
    res.end('Welcome to the Contact Page!');
  } else {
    res.writeHead(404);
    res.end('Page Not Found');
  }
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
