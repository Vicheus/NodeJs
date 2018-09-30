import * as express from 'express';
import * as http from 'http';
import * as path from 'path';
import * as morgan from 'morgan';

const app      = express();
const host     = '0.0.0.0';
const port     = 8090;

app.use(morgan('dev'));

app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end('<html><body><h1>This is Express!</h1></body></html>');
});

app.get('/favicon.png', (req, res) => {
    res.sendFile(path.join(`${__dirname}/public/favicon.png`));
});

const server = http.createServer(app);

server.listen(port, host, () => {
    console.log(`Example app listening on http://${host}:${port}!`);
});