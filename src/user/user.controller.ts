// users.controller.ts
import { Controller, Post, Body, Request, UseGuards, Get } from '@nestjs/common';
import { JwtAuthGuard } from './jwt-auth.guard';
import { UsersService } from './user.service';
import { CreateUserDto } from './create-user.dto';
import { LoginUserDto } from './login-user.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    const { username, password } = createUserDto;
    return this.usersService.register(username, password);
  }

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    const { username, password } = loginUserDto;
    return this.usersService.login(username, password);
  }

  @Post('test')
  async test(@Body() loginUserDto: LoginUserDto) {
    const { username, password } = loginUserDto;
    return this.usersService.testing(password);
  }

  

  @UseGuards(JwtAuthGuard)
  @Get('logout')
  async logout(@Request() req) {
    // Implement logout logic here
  }
}
