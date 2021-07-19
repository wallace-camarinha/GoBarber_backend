import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload';
import ensureAuth from '@modules/users/infra/http/middlewares/ensureAuth';
import CreateUserService from '@modules/users/services/CreateUserService';
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post('/', async (request, response) => {
  const { name, email, password } = request.body;

  const createUser = new CreateUserService();
  const user = await createUser.execute({ name, email, password });

  const userWithoutPassword = {
    id: user.id,
    name: user.name,
    email: user.email,
    created_at: user.created_at,
    updated_at: user.updated_at,
  };

  return response.json(userWithoutPassword);
});

usersRouter.patch(
  '/avatar',
  ensureAuth,
  upload.single('avatar'),
  async (request, response) => {
    const updateUserService = new UpdateUserAvatarService();

    const user = await updateUserService.execute({
      user_id: request.user.id,
      avatarFilename: request.file?.filename,
    });

    return response.json(user);
  },
);

export default usersRouter;
