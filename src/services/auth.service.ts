import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SampleEnum, User } from '../models/user.model';
import * as bcrypt from 'bcrypt';
import { jwtConstants } from 'src/config/jwt.config';

export type JwtPayload = {
  sub: number;
  role: SampleEnum;
};

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(userName: string, password: string): Promise<User> {
    const user = await this.userRepo.findOne({ where: { userName } });
    if (!user) throw new UnauthorizedException('User not found');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new UnauthorizedException('Invalid credentials');

    return user;
  }

  async login(user: User) {
    const payload: JwtPayload = { sub: user.id, role: user.role };

    const token = this.jwtService.sign(payload); 
    return { access_token: token };
  }
}
