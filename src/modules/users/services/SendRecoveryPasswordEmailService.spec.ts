// import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import SendRecoveryPasswordEmailService from './SendRecoveryPasswordEmailService';

describe('SendRecoveryPasswordEmail', () => {
  it('should be able to recover password using email', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeMailProvider = new FakeMailProvider();

    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

    const sendRecoveryPasswordEmailService =
      new SendRecoveryPasswordEmailService(
        fakeUsersRepository,
        fakeMailProvider,
      );

    await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: '12345',
    });

    await sendRecoveryPasswordEmailService.execute({
      email: 'john.doe@example.com',
    });

    expect(sendMail).toHaveBeenCalled();
  });
});
