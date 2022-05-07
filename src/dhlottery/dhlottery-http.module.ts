import { Module } from '@nestjs/common';
import { DhlotteryController } from './dhlottery.controller';
import { DhlotteryService } from './dhlottery.service';
import { DhlotteryModule } from './dhlottery.module';

@Module({
  controllers: [DhlotteryController],
  providers: [DhlotteryService],
  imports: [DhlotteryModule],
})
export class DhlotteryHttpModule {}
