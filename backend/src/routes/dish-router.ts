import * as express from 'express';

const dishRouter = express.Router();

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

dishRouter.route('/:dishId')
    .get((req, res) => {
        res.end(`Will send information about dish with id ${req.params.dishId} to you!`);
    })
    .post((req, res) => {
        res.statusCode = 403;
        res.end(`POST operation is not supported on /dishes/${req.params.dishId}`);
    })
    .put((req, res) => {
        res.write(`Updating dish with id ${req.params.dishId}. `);
        res.end(`Will update the dish: ${req.body.name} with details ${req.body.description}`);
    })
    .delete((req, res) => {
        res.end(`Deleting the dish ${req.params.dishId}`);
    });

export default dishRouter;