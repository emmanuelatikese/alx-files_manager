import express from 'express';
import AppController from '../controllers/AppController';

const routes = express.Router();
const appController = new AppController();

routes.get('/status', (req, res) => appController.getStatus(req, res));
routes.get('/stats', (req, res) => appController.getStats(req, res));

export default routes;
