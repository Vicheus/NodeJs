import * as http from 'http';
import {Http2Server} from "http2";
import {IncomingMessage, ServerResponse} from "http";

const port = 8090;
const hostname = '0.0.0.0';
const server: Http2Server = http.createServer((req: IncomingMessage, res: ServerResponse) => {
    console.log(req.headers);
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:4200");
    res.setHeader("Content-Type", "text/html");
    res.statusCode = 200;
    res.end('<html><body><h1>Hello World</h1></body></html>');
});

server.listen(port, hostname, () => {
    console.log(`server is running on http://localhost:${port}`);
});