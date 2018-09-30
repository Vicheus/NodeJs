import * as express from 'express';
import * as http from 'http';
import * as path from 'path';
import * as morgan from 'morgan';
import * as bodyParser from 'body-parser';

const app      = express();
const host     = '0.0.0.0';
const port     = 8090;
const dishRouter = express.Router();

app.use(morgan('dev'));

app.use(bodyParser.json());

app.all('/dishes', (req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
});

app.get('/dishes', (req, res) => {
    res.end('Will send all information about dishes to you!');
});

app.post('/dishes', (req, res) => {
    res.end(`Will add the dish: ${req.body.name} with details ${req.body.description}`);
});

app.put('/dishes', (req, res) => {
    res.statusCode = 403;
    res.end(`PUT operation is not supported on dishes`);
});

app.delete('/dishes', (req, res) => {
    res.end('Deleting all the dishes');
});

app.get('/dishes/:id', (req, res) => {
    res.end(`Will send information about dishe with id ${req.params.id} to you!`);
});

app.post('/dishes/:id', (req, res) => {
    res.statusCode = 403;
    res.end(`POST operation is not supported on /dishes/${req.params.id}`);
});

app.put('/dishes/:id', (req, res) => {
    res.write(`Updating dish with id ${req.params.id}`);
    res.end(`Will update the dish: ${req.body.name} with details ${req.body.description}`);
});

app.delete('/dishes/:id', (req, res) => {
    res.end(`Deleting the dish ${req.params.id}`);
});

app.use(express.static(`${__dirname}/public`));

app.use((req, res) => {
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