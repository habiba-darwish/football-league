import {
  Controller,
  Post,
  Body,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { HttpExceptionFilter } from 'src/filters/http-exception.filter';
import { LoggingInterceptor } from 'src/interceptors/logging.interceptor';
import { AdminLoginDto } from '../dtos/auth.dto';

@Controller('auth')
@UseFilters(new HttpExceptionFilter())
@UseInterceptors(LoggingInterceptor)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: AdminLoginDto) {
    const user = await this.authService.validateUser(
      loginDto.userName,
      loginDto.password,
    );

    if (user.role !== 'Admin') {
      throw new Error('Only Admins can log in');
    }

    return this.authService.login(user);
  }
}
