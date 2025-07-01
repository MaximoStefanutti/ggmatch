import { Body, Controller, Delete, Get, Param, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { ApiBody, ApiOperation } from '@nestjs/swagger';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    @InjectRepository(User) private readonly UserRepository: Repository<User>,
  ) {}
  @ApiOperation({ summary: 'Busqueda de todos los usuarios' })
  @Get()
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }
  @ApiOperation({ summary: 'Busqueda de un usuario por id' })
  @Get(':id')
  async findOne(id: string): Promise<User> {
    return this.usersService.findOne(id);
  }
  @ApiOperation({ summary: 'Actualizacion de un usuario' })
  @ApiBody({
    description: 'Datos del usuario a actualizar',
    examples: {
      User: {
        value: {
          name: 'Example',
          email: 'Example@example.com',
          password: 'example123$',
        },
      },
    },
  })
  @Put(':id')
  async update(@Param('id') id: string, @Body() UpdateUserDto: UpdateUserDto) {
    return this.usersService.update(id, UpdateUserDto);
  }
  @ApiOperation({ summary: 'Eliminacion de un usuario por id' })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
