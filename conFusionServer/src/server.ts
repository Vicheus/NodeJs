import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as fs from 'fs';
import * as http from 'http';
import * as morgan from 'morgan';
import * as path from 'path';
import dishRouter from './routes/dish-router';
import leaderRouter from './routes/leader-router';
import promoRouter from './routes/promo-router';

const app      = express();
const host     = '0.0.0.0';
const port     = 8090;

app.use(morgan('dev'));

app.use(bodyParser.json());

app.use('/dishes', dishRouter);

app.use('/promotions', promoRouter);

app.use('/leaders', leaderRouter);

console.log(__dirname);

app.use(express.static(`${__dirname}/views`));

app.use((req, res, next) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  next();
});

app.get('/favicon.png', (req, res) => {
  res.sendFile(path.join(`${__dirname}/views/favicon.png`));
});

const server = http.createServer(app);

server.listen(port, host, () => {
  console.log(`Example app listening on http://${host}:${port}!`);
});
