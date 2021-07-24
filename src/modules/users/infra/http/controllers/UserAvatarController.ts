import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class UsersAvatarController {
  public async update(request: Request, response: Response): Promise<Response> {
    const updateUserService = container.resolve(UpdateUserAvatarService);

    const user = await updateUserService.execute({
      user_id: request.user.id,
      avatarFilename: request.file?.filename,
    });

    return response.json(user);
  }
}
