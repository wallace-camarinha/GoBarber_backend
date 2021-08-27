import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListProviderMonthAvailabilityService from './ListProviderMonthAvailabilityService';

let listProviderMonthAvailability: ListProviderMonthAvailabilityService;
let fakeAppointmentsRepository: FakeAppointmentsRepository;

describe('ListProviderAvailability', () => {
  beforeEach(() => {
    // listProviderMonthAvailability = new ListProviderMonthAvailabilityService();
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
  });

  it('should be able to list the month availability from the provider', async () => {
    await fakeAppointmentsRepository.create({
      provider_id: 'id',
      date: new Date(2021, 9, 7, 8, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'id',
      date: new Date(2021, 9, 7, 10, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'id',
      date: new Date(2021, 9, 8, 8, 0, 0),
    });

    const availability = await listProviderMonthAvailability.execute({
      user_id: 'id',
      year: 2021,
      month: 5,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        {
          day: 7,
          available: false,
        },
        {
          day: 8,
          available: false,
        },
        {
          day: 9,
          available: true,
        },
        {
          day: 10,
          available: true,
        },
      ]),
    );
  });
});
