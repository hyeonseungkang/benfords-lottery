import { Controller, Get, Render } from '@nestjs/common';
import { DhlotteryService } from './dhlottery.service';

@Controller('/dhlottery')
export class DhlotteryController {
  constructor(private readonly dhlotteryService: DhlotteryService) {}

  @Get('/fetch-number')
  public async fetchNumber() {
    return this.dhlotteryService.fetchNumber();
  }

  @Get('/benfords')
  @Render('dhlottery/benfords')
  public async benfords() {
    return this.dhlotteryService.benfords();
  }
}
