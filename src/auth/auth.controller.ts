import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { ApiOperation } from '@nestjs/swagger';
import { SigninDTO } from './dto/signin.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    summary: 'Registro de usuario',
    description: 'Registra un nuevo usuario en la base de datos',
  })
  @Post('signup')
  async signup(@Body() data: CreateAuthDto) {
    return this.authService.signupService(data);
  }

  @ApiOperation({
    summary: 'Inicio de sesión',
    description: 'Inicia sesión con un usuario existente',
  })
  @Post('login')
  async login(
    @Body() data: SigninDTO,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.loginWithCookie(data, res);
  }

  @ApiOperation({
    summary: 'Desconexión de sesión',
    description: 'Cierra la sesión del usuario',
  })
  @Post('logout')
  logout(@Res({ passthrough: true }) res: Response) {
    return this.authService.logoutService(res);
  }
}
