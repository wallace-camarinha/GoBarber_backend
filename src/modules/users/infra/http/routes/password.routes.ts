import { Router } from 'express';
import RecoveryPasswordController from '../controllers/RecoveryPasswordController';
import ResetPasswordController from '../controllers/ResetPasswordController';

const passwordRouter = Router();

const recoveryPasswordController = new RecoveryPasswordController();
const resetPasswordController = new ResetPasswordController();

passwordRouter.post('/recovery', recoveryPasswordController.create);
passwordRouter.post('/reset', resetPasswordController.create);

export default passwordRouter;
