import { Router } from 'express';
import { container } from 'tsyringe';
import SessionsController from '../controllers/SessionsControllers';

const sessionsRouter = Router();
const sessionController = new SessionsController();

sessionsRouter.post('/', sessionController.create);

export default sessionsRouter;
