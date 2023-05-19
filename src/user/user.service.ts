// users.service.ts
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async findByUsername(username: string) {
    return this.usersRepository.findOne({ where: { username } });
  }

  async validatePassword(password: string, hashedPassword: string) {
    return bcrypt.compare(password, hashedPassword);
  }

  async register(username: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = this.usersRepository.create({ username, password: hashedPassword });
    await this.usersRepository.save(user);
    return user;
  }

  async testing(token: string){
    try {
      console.log('ddddee',this.jwtService.verify(token));
      return {"abc":this.jwtService.verify(token)};      
    } catch (error) {
      return "Something went wrong."      
    }
  }

  async login(username: string, password: string) {
    const user = await this.findByUsername(username);
    if (user && (await this.validatePassword(password, user.password))) {
      const { password, ...result } = user;
      const token = this.jwtService.sign(result);
      
     return { token };
    }
    return null;
  }
}
