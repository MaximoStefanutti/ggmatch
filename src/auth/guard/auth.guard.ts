import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { constanst } from '../jwt.constanst';
import { Role } from '../enum/role.enum';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    //obtener el token de las cookies
    const token = request.cookies['token'];
    if (!token) {
      throw new UnauthorizedException('Access to this resource is denied');
    }
    try {
      const secret = constanst.secret;
      const user = this.jwtService.verify(token, { secret });
      if (user.isAdmin) {
        user.roles = [Role.ADMIN];
      } else {
        user.roles = [Role.USER];
      }
      return true;
    } catch (err) {
      throw new UnauthorizedException('Access to this resource is denied');
    }
  }
}
