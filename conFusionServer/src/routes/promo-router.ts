import * as express from 'express';
import dishRouter from './dish-router';

const promoRouter = express.Router();

promoRouter.route('/')
  .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
  })
  .get((req, res) => {
    res.end('Will send all information about promotions to you!');
  })
  .post((req, res) => {
    res.end(`Will add the promotion: ${req.body.name} with details ${req.body.description}`);
  })
  .put((req, res) => {
    res.statusCode = 403;
    res.end('PUT operation is not supported on promotions');
  })
  .delete((req, res) => {
    res.end('Deleting all the promotions');
  });

promoRouter.route('/:promoId')
  .get((req, res) => {
    res.end(`Will send information about promotion with id ${req.params.promoId} to you!`);
  })
  .post((req, res) => {
    res.statusCode = 403;
    res.end(`POST operation is not supported on /promotions/${req.params.promoId}`);
  })
  .put((req, res) => {
    res.write(`Updating promotion with id ${req.params.promoId}. `);
    res.end(`Will update the promotion: ${req.body.name} with details ${req.body.description}`);
  })
  .delete((req, res) => {
    res.end(`Deleting the promotion ${req.params.promoId}`);
  });

export default promoRouter;
