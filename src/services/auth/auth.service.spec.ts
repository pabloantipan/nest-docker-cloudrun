import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { AuthGuard } from '@guards/auth.guard';
import { UsersService } from '@services/users/users.service';

it('can create an instance of auth service', async () => {
  // Mocking users service
  const mockUsersService = {
    find: () => Promise.resolve([]),
    create: (email: string, password: string) =>
      Promise.resolve({ id: 1, email, password }),
  };

  const module = await Test.createTestingModule({
    providers: [
      AuthService,
      {
        provide: UsersService,
        useValue: mockUsersService,
      },
    ],
  }).compile();

  const service = module.get(AuthService);

  expect(service).toBeDefined();
});
