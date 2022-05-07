import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LotteryResultEntity } from './dhlottery/entity/lottery-result.entity';
import { CommonModule } from './common/common.module';
import { DhlotteryHttpModule } from './dhlottery/dhlottery-http.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.development', '.env.production', '.env'],
    }),
    TypeOrmModule.forRoot({
      type: 'mariadb',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      synchronize: process.env.NODE_ENV === 'development',
      entities: [LotteryResultEntity],
    }),
    CommonModule,
    DhlotteryHttpModule,
  ],
})
export class AppModule {}
