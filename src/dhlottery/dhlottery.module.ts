import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LotteryResultEntity } from './entity/lottery-result.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LotteryResultEntity])],
  exports: [TypeOrmModule],
})
export class DhlotteryModule {}
