import * as express from 'express';
import * as bodyParser from 'body-parser';

const dishRouter = express.Router();

dishRouter.use(bodyParser.json());

dishRouter.route('/')
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        next();
    })
    .get((req, res) => {
        res.end('Will send all information about dishes to you!');
    })
    .post((req, res) => {
        res.end(`Will add the dish: ${req.body.name} with details ${req.body.description}`);
    })
    .put((req, res) => {
        res.statusCode = 403;
        res.end(`PUT operation is not supported on dishes`);
    })
    .delete((req, res) => {
        res.end('Deleting all the dishes');
    });

export default dishRouter;