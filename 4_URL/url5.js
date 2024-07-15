const url = require('url');

const baseUrl = 'https://www.example.com/path/';
const relativeUrl = 'name?query=string'; 

const resolvedUrl = url.resolve(baseUrl, relativeUrl);

console.log(resolvedUrl); // 'https://www.example.com/path/name?query=string'

