import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { compare, hash } from 'bcrypt';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async signupService(data: Partial<User>): Promise<User> {
    const { email, password } = data;

    if (!email || !password) {
      throw new BadRequestException('Email and password are required');
    }

    const userExist = await this.userRepository.findOne({ where: { email } });
    if (userExist) {
      throw new BadRequestException('Email already in use');
    }

    const hashedPassword = await hash(password, 10);
    const newUser = await this.userRepository.save({
      ...data,
      password: hashedPassword,
    });

    return newUser;
  }

  async loginService(
    data: Partial<User>,
  ): Promise<{ token: string; user: Omit<User, 'password'> }> {
    const { email, password } = data;

    if (!email || !password) {
      throw new BadRequestException('Email and password are required');
    }

    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new UnauthorizedException('Incorrect credentials');
    }

    const passwordValid = await compare(password, user.password);
    if (!passwordValid) {
      throw new UnauthorizedException('Incorrect credentials');
    }

    const { password: _, ...userWithoutPassword } = user;
    const token = this.jwtService.sign({ id: user.id, email: user.email });

    return { token, user: userWithoutPassword };
  }

  async loginWithCookie(
    data: Partial<User>,
    res: Response,
  ): Promise<{ user: any }> {
    const { token, user } = await this.loginService(data);

    res.cookie('token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 1000 * 60 * 60 * 24,
      path: '/',
    });

    return { user };
  }

  logoutService(res: Response) {
    res.clearCookie('token', {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      path: '/',
    });

    return { message: 'Session ended successfully' };
  }
}
