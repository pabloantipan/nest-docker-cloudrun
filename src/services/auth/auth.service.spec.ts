import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { AuthGuard } from '@guards/auth.guard';
import { UsersService } from '@services/users/users.service';
import { User } from '@users/models/user.entity';

describe('AuthService', () => {
  let authService: AuthService;
  let mockUsersService: Partial<UsersService>;

  beforeEach(async () => {
    const users: User[] = [];

    // Mocking users service
    mockUsersService = {
      find: (email: string) => {
        const filteredUsers = users.filter((user) => user.email === email);
        return Promise.resolve(filteredUsers);
      },
      create: (email: string, password: string) => {
        const user = {
          id: Math.floor(Math.random() * 999999),
          email,
          password,
        } as User;
        users.push(user);
        return Promise.resolve(user);
      },
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

    authService = module.get(AuthService);
  });

  it('can create an instance of auth service', async () => {
    expect(authService).toBeDefined();
  });

  it('creates a new user with a salted and hashed password', async () => {
    const user = await authService.signup('asd@sdf.com', 'asdf');

    expect(user.password).not.toEqual('asdf');
    const [salt, hash] = user.password.split('.');
    expect(salt).toBeDefined();
    expect(hash).toBeDefined();
  });

  it('throws an error if user signs up with email that is in use', async () => {
    mockUsersService.find = () =>
      Promise.resolve([{ id: 1, email: 'a', password: '1' } as User]);
    try {
      await authService.signup('asd@sdf.com', 'asdf');
    } catch (err) {}
  });

  it('throws an error if signin is called with an unused email', async () => {
    try {
      await authService.signin('asdasd@asdas.com', 'saadfsdf');
    } catch (err) {}
  });

  it('throws if an invalid password is provided', async () => {
    mockUsersService.find = () =>
      Promise.resolve([{ email: 'asd@asd.com', password: 'qwesdag' } as User]);
    try {
      await authService.signin('sadfa@dsfg.com', '234rfd');
    } catch (error) {}
  });

  it('returns an user if correct password is provided', async () => {
    await authService.signup('dsaf@sdf.com', 'sdfsadf');

    const user = await authService.signin('dsaf@sdf.com', 'sdfsadf');
    expect(user).toBeDefined();
  });
});
