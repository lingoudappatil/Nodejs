const fs = require("fs");
const res = fs.readFileSync("./fswrite.txt","utf-8");
console.log(res);