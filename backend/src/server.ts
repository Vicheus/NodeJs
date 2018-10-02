import * as express from 'express';
import * as http from 'http';
import * as path from 'path';
import * as fs from 'fs';
import * as morgan from 'morgan';
import * as bodyParser from 'body-parser';
import dishRouter from './routes/dish-router';

const app      = express();
const host     = '0.0.0.0';
const port     = 8090;

app.use(morgan('dev'));

app.use(bodyParser.json());

app.use('/dishes', dishRouter);

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

app.use((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    next();
});

app.get('/favicon.png', (req, res) => {
    res.sendFile(path.join(`${__dirname}/public/favicon.png`));
});

app.get('/clinic', (req, res) => {
    fs.access(path.join(`${__dirname}/../79.clinic-doctor.html`), (err) => {
        if (!err) {
            res.sendFile(path.join(`${__dirname}/../79.clinic-doctor.html`));
        } else {
            console.log('ERRRROROROR');
        }
    } );
});

const server = http.createServer(app);

server.listen(port, host, () => {
    console.log(`Example app listening on http://${host}:${port}!`);
});