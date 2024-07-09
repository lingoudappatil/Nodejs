const url = require('url');

const myURL = 'https://example.com:8080/path/name?query=string#hash';

const parsedURL = url.parse(myURL);

console.log(parsedURL);

