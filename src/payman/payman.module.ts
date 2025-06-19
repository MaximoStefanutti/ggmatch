import { Module } from '@nestjs/common';
import { PaymanService } from './payman.service';
import { PaymanController } from './payman.controller';

@Module({
  controllers: [PaymanController],
  providers: [PaymanService],
})
export class PaymanModule {}
