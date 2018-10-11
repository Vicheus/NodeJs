import * as express from 'express';

const leaderRouter = express.Router();

leaderRouter.route('/')
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        next();
    })
    .get((req, res) => {
        res.end('Will send all information about leaders to you!');
    })
    .post((req, res) => {
        res.end(`Will add the leader: ${req.body.name} with details ${req.body.description}`);
    })
    .put((req, res) => {
        res.statusCode = 403;
        res.end(`PUT operation is not supported on leaders`);
    })
    .delete((req, res) => {
        res.end('Deleting all the leaders');
    });

leaderRouter.route('/:leaderId')
    .get((req, res) => {
        res.end(`Will send information about leader with id ${req.params.leaderId } to you!`);
    })
    .post((req, res) => {
        res.statusCode = 403;
        res.end(`POST operation is not supported on /leaders/${req.params.leaderId }`);
    })
    .put((req, res) => {
        res.write(`Updating leader with id ${req.params.leaderId }. `);
        res.end(`Will update the leader: ${req.body.name} with details ${req.body.description}`);
    })
    .delete((req, res) => {
        res.end(`Deleting the leader ${req.params.leaderId }`);
    });

export default leaderRouter;