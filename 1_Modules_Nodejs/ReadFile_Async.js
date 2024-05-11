const fs = require("fs");
const res = fs.readFileSync("./fswrite.txt","utf-8",(err,result)=>
{
if(err)
    {
        console.log("Errorr",err);
    }else
    {
        console.log("result");
    }
});