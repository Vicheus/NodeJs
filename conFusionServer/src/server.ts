import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as fs from 'fs';
import * as http from 'http';
import * as logger from 'morgan';
import * as path from 'path';
import dishRouter from './routes/dish-router';
import leaderRouter from './routes/leader-router';
import promoRouter from './routes/promo-router';
import {NextFunction, Request, Response} from 'express';

const app      = express();
const host     = '0.0.0.0';
const port     = 8090;

app.use(logger('dev'));

app.use(bodyParser.json());

app.use('/dishes', dishRouter);

app.use('/promotions', promoRouter);

app.use('/leaders', leaderRouter);

app.use(express.static(`${__dirname}/views`));

app.use((req: Request, res: Response, next: NextFunction) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  next();
});

// error handler
app.use((err: any, req: Request, res: Response) => {
//  set locals only providing error in develop
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'developement' ? '' : '';
  res.status(err.status || 500);
  res.render('error');
});

app.get('/favicon.png', (req: Request, res: Response) => {
  res.sendFile(path.join(`${__dirname}/views/favicon.png`));
});

const server = http.createServer(app);

server.listen(port, host, () => {
  console.log(`Example app listening on http://${host}:${port}!`);
});
