import {
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  // UseInterceptors,
  Injectable,
} from '@nestjs/common';
import { UsersService } from '@services/users/users.service';

@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {
  constructor(private userService: UsersService) {}

  async intercept(context: ExecutionContext, handler: CallHandler) {
    const request = context.switchToHttp().getRequest();
    const { userId } = request.session || {};
    console.log('userId', userId);

    if (userId) {
      const user = await this.userService.findOne(userId);
      request.currentUser = user;
    }

    return handler.handle();
  }
}
