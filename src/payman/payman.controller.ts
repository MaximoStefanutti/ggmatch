import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PaymanService } from './payman.service';
import { CreatePaymanDto } from './dto/create-payman.dto';
import { UpdatePaymanDto } from './dto/update-payman.dto';

@Controller('payman')
export class PaymanController {
  constructor(private readonly paymanService: PaymanService) {}

  @Post()
  create(@Body() createPaymanDto: CreatePaymanDto) {
    return this.paymanService.create(createPaymanDto);
  }

  @Get()
  findAll() {
    return this.paymanService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.paymanService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePaymanDto: UpdatePaymanDto) {
    return this.paymanService.update(+id, updatePaymanDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.paymanService.remove(+id);
  }
}
