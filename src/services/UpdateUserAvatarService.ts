import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';

import uploadConfig from '../config/upload';
import AppError from '../errors/AppError';
import User from '../models/User';

interface Request {
  user_id: string;
  avatarFilename?: string;
}

class UpdateUserAvatarService {
  public async execute({ user_id, avatarFilename }: Request): Promise<User> {
    const usersRepository = getRepository(User);
    const user = await usersRepository.findOne(user_id);

    if (!user_id) {
      throw new AppError('Only authenticated users can change the avatar', 401);
    }

    if (user?.avatar) {
      const userAvatarFilePPath = path.join(
        uploadConfig.directory,
        user.avatar,
      );

      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePPath);

      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePPath);
      }
    }

    user!.avatar = avatarFilename;

    await usersRepository.save(user!);

    const userWithoutPassword = {
      id: user?.id,
      name: user?.name,
      email: user?.email,
      avatar: user?.avatar,
      created_at: user?.created_at,
      updated_at: user?.updated_at,
    };

    return userWithoutPassword as User;
  }
}

export default UpdateUserAvatarService;
