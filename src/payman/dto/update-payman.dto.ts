import { PartialType } from '@nestjs/mapped-types';
import { CreatePaymanDto } from './create-payman.dto';

export class UpdatePaymanDto extends PartialType(CreatePaymanDto) {}
