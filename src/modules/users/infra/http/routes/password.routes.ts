import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import RecoveryPasswordController from '../controllers/RecoveryPasswordController';
import ResetPasswordController from '../controllers/ResetPasswordController';

const passwordRouter = Router();

const recoveryPasswordController = new RecoveryPasswordController();
const resetPasswordController = new ResetPasswordController();

passwordRouter.post(
  '/recovery',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
    },
  }),
  recoveryPasswordController.create,
);
passwordRouter.post(
  '/reset',
  celebrate({
    [Segments.BODY]: {
      token: Joi.string().uuid().required(),
      password: Joi.string().required(),
      password_confirmation: Joi.string().required().valid(Joi.ref('password')),
    },
  }),
  resetPasswordController.create,
);

export default passwordRouter;
