import { getRepository } from 'typeorm';
import { injectable, inject } from 'tsyringe';
import path from 'path';
import fs from 'fs';

import uploadConfig from '@config/upload';

import AppError from '@shared/errors/AppError';
import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  user_id: string;
  avatarFilename?: string;
}

@injectable()
class UpdateUserAvatarService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ user_id, avatarFilename }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('Only authenticated users can change the avatar', 401);
    }

    if (user.avatar) {
      const userAvatarFilePPath = path.join(
        uploadConfig.directory,
        user.avatar,
      );

      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePPath);

      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePPath);
      }
    }

    user.avatar = avatarFilename;

    await this.usersRepository.save(user);

    const userWithoutPassword = {
      id: user.id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      created_at: user.created_at,
      updated_at: user.updated_at,
    };

    return userWithoutPassword as User;
  }
}

export default UpdateUserAvatarService;
