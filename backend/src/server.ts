import * as express from 'express';
import * as http from 'http';
import * as path from 'path';
import * as fs from 'fs';
import * as morgan from 'morgan';
import * as bodyParser from 'body-parser';
import dishRouter from './routes/dish-router';
import promoRouter from "./routes/promo-router";
import leaderRouter from "./routes/leader-router";

const app      = express();
const host     = '0.0.0.0';
const port     = 8090;

app.use(morgan('dev'));

app.use(bodyParser.json());

app.use('/dishes', dishRouter);

app.use('/promotions', promoRouter);

app.use('/leaders', leaderRouter);

app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    next();
});

app.get('/favicon.png', (req, res) => {
    res.sendFile(path.join(`${__dirname}/public/favicon.png`));
});

const server = http.createServer(app);

server.listen(port, host, () => {
    console.log(`Example app listening on http://${host}:${port}!`);
});