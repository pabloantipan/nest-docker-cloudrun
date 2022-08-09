import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './models/dtos/create-user.dto';
import { UsersService } from '@services/users/users.service';

@Controller('/auth')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('/signup')
  createUser(@Body() body: CreateUserDto) {
    console.log(body);
    this.usersService.create(body.email, body.password);
  }
}
