const http = require("http");

const port = 8081;  //local port no.

http
    .createServer((req, res) => { //call back func
        res.writeHead(200, { "Content-Type": "text/html"});
        res.write("<h2>Hey Server Started and you can proceed </h2>");
        res.end();
    })
    .listen(port, () => { //call back func
        console.log(`NodeJS Server started running on Port ${port}`);
    });


//http://localhost:8081

