import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '@services/auth/auth.service';
import { UsersService } from '@services/users/users.service';
import { User } from './models/user.entity';
import { UsersController } from './users.controller';

describe('UsersController', () => {
  let controller: UsersController;
  let mockUsersService: Partial<UsersService>;
  let mockAuthService: Partial<AuthService>;

  beforeEach(async () => {
    mockUsersService = {
      findOne: (id: number) => {
        return Promise.resolve({
          id,
          email: 'sdfsd@sdf.cl',
          password: '1234fg',
        } as User);
      },
      find: (email: string) => {
        return Promise.resolve([{ id: 1, email, password: '123123' } as User]);
      },
      remove: (id: number) => {
        return Promise.resolve({
          id,
          email: 'werwe@as.cl',
          password: '123sad',
        } as User);
      },
      update: (id: number, attrs: Partial<User>) => {
        return Promise.resolve({ id, ...attrs } as User);
      },
    };
    mockAuthService = {
      signup: (email: string, password: string) => {
        return Promise.resolve({ id: 1, email, password } as User);
      },
      signin: (email: string, password: string) => {
        return Promise.resolve({ id: 1, email, password } as User);
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('findAllUsers returns a list of users with the given email', async () => {
    const mockEmail = 'asdf@sadf.com';
    const users = await controller.findAllUsers(mockEmail);
    expect(users.length).toEqual(1);
    expect(users[0].email).toEqual(mockEmail);
  });

  it('findUser returns a single user with the given id', async () => {
    const user = await controller.findUser('1');
    expect(user).toBeDefined();
  });

  it('findUser throws an error if user with given id is not found', async () => {
    mockUsersService.findOne = () => null;
    try {
      await controller.findUser('1');
    } catch (err) {}
  });

  it('signin updates session object and return user', async () => {
    const session = { userId: -10 };
    const user = await controller.signin(
      { email: 'asdf@asdf.com', password: 'asdf' },
      session,
    );

    expect(user.id).toEqual(1);
    expect(session.userId).toEqual(1);
  });
});
