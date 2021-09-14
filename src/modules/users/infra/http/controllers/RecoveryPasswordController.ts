import { Request, Response } from 'express';
import { container } from 'tsyringe';

import SendRecoveryPasswordEmailService from '@modules/users/services/SendRecoveryPasswordEmailService';

export default class RecoveryPasswordController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email } = request.body;

    const sendRecoveryPasswordEmail = container.resolve(
      SendRecoveryPasswordEmailService,
    );

    await sendRecoveryPasswordEmail.execute({ email });

    return response.status(204).json();
  }
}
