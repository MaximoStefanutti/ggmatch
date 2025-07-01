import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}
  // busqueda de usuarios.
  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }
  // busqueda de un usuario por id.
  async findOne(id: string): Promise<User> {
    const foundUser = await this.userRepository.findOneBy({ id: id });
    if (!foundUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return foundUser;
  }

  // actualizacion de un usuario.
  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const foundUser = await this.userRepository.findOne({ where: { id: id } });
    if (!foundUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    if (updateUserDto.password) {
      if (!updateUserDto.currentPassword) {
        throw new UnauthorizedException(
          `Current password is required to update the password`,
        );
      }
      const passwordMatch = await bcrypt.compare(
        updateUserDto.currentPassword,
        foundUser.password,
      );
      if (!passwordMatch) {
        throw new UnauthorizedException(`Current password is incorrect`);
      }
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(
        updateUserDto.password,
        saltRounds,
      );
      updateUserDto = { ...updateUserDto, password: hashedPassword };
    } else {
      updateUserDto = {
        ...updateUserDto,
        password: undefined,
        currentPassword: undefined,
      };
    }
    Object.assign(foundUser, updateUserDto);
    return this.userRepository.save(foundUser);
  }
  // eliminacion de un usuario.
  async remove(id: string): Promise<string> {
    const foundUser = await this.userRepository.findOne({ where: { id: id } });
    if (!foundUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    foundUser.isDeleted = true;
    await this.userRepository.save(foundUser);
    return `User with ID ${id} has been deleted`;
  }
}
