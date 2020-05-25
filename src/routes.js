import { Router } from 'express';

import StatusController from './app/controllers/StatusController';
import PaymentController from './app/controllers/PaymentController';

import PaymentValidator from './app/middlewares/validations/PaymentValidator';

const routes = new Router();

routes.get('/status', StatusController.show);

routes.post('/pay/:operator', PaymentValidator.store, PaymentController.store);

routes.use('*', (req, res) => {
  return res.status(400).json({ error: 'Router not found' });
});

export default routes;
