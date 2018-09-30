import * as http from 'http';
import * as fs from 'fs';
import * as path from 'path';
import {Http2Server} from "http2";
import {IncomingMessage, ServerResponse} from "http";

const port = 8090;
const hostname = '0.0.0.0';
const server: Http2Server = http.createServer((req: IncomingMessage, res: ServerResponse) => {
    const { method, url } = req;
    console.log(`Request for ${url} for method ${method}`);

    req.on('error', err => {
        console.log(`REQUEST ERROR: ${err}`);
    });

    if (method === 'GET') {
        let fileUrl = '';

        if (url === '/') fileUrl = '/index.html';
        else if (url === '/aboutus') fileUrl = '/aboutus.html';
        else fileUrl = url;

        let filePath = path.resolve(`./src/public${fileUrl}`);
        const fileExt = path.extname(filePath);
        console.log(fileExt, filePath, fileUrl);

        if (fileUrl === '/favicon.png') {
            fs.access(filePath, err => {
                if (err) {
                    console.log('favicon does not exist');
                    res.statusCode = 404;
                    res.setHeader('Content-Type', 'text/html');
                    res.end('<html><body><h1>Error 404 ' + filePath + ' not found!</h1></body></html>');

                    return;
                } else {
                    console.log('favicon exists');
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'image/png');
                    fs.createReadStream(filePath).pipe(res);
                }
            });
        } else if (fileExt === '.html') {
            fs.access(filePath, (err: NodeJS.ErrnoException) => {
                if (err) {
                    console.log(`ERROR: ${err}`);
                    res.statusCode = 404;
                    res.setHeader('Content-Type', 'text/html');
                    res.end('<html><body><h1>Error 404 ' + filePath + ' not found!</h1></body></html>');

                    return;
                } else {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'text/html');
                    fs.createReadStream(filePath).pipe(res);
                }
            });
        } else {
            res.statusCode = 404;
            res.setHeader('Content-Type', 'text/html');
            res.end('<html><body><h1>Error 404 ' + filePath + '  not an html file!</h1></body></html>');

            return;
        }
    } else {
        res.statusCode = 400;
        res.setHeader('Content-Type', 'text/html');
        res.end('<html><body><h1>Bad request 400 ' + method + ' not supported!</h1></body></html>');

        return;
    }
});

server.listen(port, hostname, () => {
    console.log(`server is running on http://localhost:${port}`);
});