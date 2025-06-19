import { Injectable } from '@nestjs/common';
import { CreatePaymanDto } from './dto/create-payman.dto';
import { UpdatePaymanDto } from './dto/update-payman.dto';

@Injectable()
export class PaymanService {
  create(createPaymanDto: CreatePaymanDto) {
    return 'This action adds a new payman';
  }

  findAll() {
    return `This action returns all payman`;
  }

  findOne(id: number) {
    return `This action returns a #${id} payman`;
  }

  update(id: number, updatePaymanDto: UpdatePaymanDto) {
    return `This action updates a #${id} payman`;
  }

  remove(id: number) {
    return `This action removes a #${id} payman`;
  }
}
