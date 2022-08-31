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
});
