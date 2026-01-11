import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from '../config/jwt.config';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];

    if (!authHeader) throw new UnauthorizedException('No token provided');

    const token = authHeader.split(' ')[1];
    try {
      const payload = this.jwtService.verify(token, { secret: jwtConstants.secret });
      request.user = payload; // attach { sub, role } to request
      if (payload.role !== 'Admin') {
        throw new UnauthorizedException('Access denied: Admins only');
      }
      return true;
    } catch {
      throw new UnauthorizedException('Invalid token');
    }
  }
}