import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeUserTokensRepository from '@modules/users/repositories/fakes/FakeUserTokensRepository';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import SendRecoveryPasswordEmailService from './SendRecoveryPasswordEmailService';

let fakeUsersRepository: FakeUsersRepository;
let fakeMailProvider: FakeMailProvider;
let fakeUserTokensRepository: FakeUserTokensRepository;
let sendRecoveryPasswordEmail: SendRecoveryPasswordEmailService;

describe('SendRecoveryPasswordEmail', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeMailProvider = new FakeMailProvider();
    fakeUserTokensRepository = new FakeUserTokensRepository();

    sendRecoveryPasswordEmail = new SendRecoveryPasswordEmailService(
      fakeUsersRepository,
      fakeMailProvider,
      fakeUserTokensRepository,
    );
  });

  it('should be able to recover password using email', async () => {
    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

    await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: '12345',
    });

    await sendRecoveryPasswordEmail.execute({
      email: 'john.doe@example.com',
    });

    expect(sendMail).toHaveBeenCalled();
  });

  it('should not be able to recover a non-existing user password', async () => {
    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

    await expect(
      sendRecoveryPasswordEmail.execute({
        email: 'john.doe@example.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should generate a recovery password token', async () => {
    const generateToken = jest.spyOn(fakeUserTokensRepository, 'generate');

    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: '12345',
    });

    await sendRecoveryPasswordEmail.execute({
      email: 'john.doe@example.com',
    });

    await expect(generateToken).toHaveBeenCalledWith(user.id);
  });
});
