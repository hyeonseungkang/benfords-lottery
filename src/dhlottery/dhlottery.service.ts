import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LotteryResultEntity } from './entity/lottery-result.entity';
import { Repository } from 'typeorm';
import { HttpService } from '@nestjs/axios';
import { GetLottoNumberDto } from './dto/get-lotto-number.dto';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class DhlotteryService {
  constructor(
    @InjectRepository(LotteryResultEntity)
    private readonly lotteryResultEntityRepository: Repository<LotteryResultEntity>,
    private readonly httpService: HttpService,
  ) {}

  public async fetchNumber() {
    const query = await this.lotteryResultEntityRepository.find();
    const numbersHash = {};
    for (const lotteryResult of query) {
      numbersHash[lotteryResult.lotNo] = true;
    }
    let data: GetLottoNumberDto = new GetLottoNumberDto();
    for (let i = 1; true; i++) {
      if (!numbersHash[i]) {
        const request = await lastValueFrom(
          this.httpService.get(
            `https://www.dhlottery.co.kr/common.do?method=getLottoNumber&drwNo=${i}`,
          ),
        );
        data = request.data;
        if (data.returnValue !== 'success') return;
        await this.lotteryResultEntityRepository.save({
          lotNo: data.drwNo,
          firstNumber: data.drwtNo1,
          secondNumber: data.drwtNo2,
          thirdNumber: data.drwtNo3,
          fourthNumber: data.drwtNo4,
          fifthNumber: data.drwtNo5,
          sixthNumber: data.drwtNo6,
          bonusNumber: data.bnusNo,
          lotDate: data.drwNoDate,
        });
      }
    }
  }

  public async benfords() {
    const query = await this.lotteryResultEntityRepository.find();
    const numbers: number[] = [];
    for (const lotteryResult of query) {
      numbers.push(lotteryResult.firstNumber);
      numbers.push(lotteryResult.secondNumber);
      numbers.push(lotteryResult.thirdNumber);
      numbers.push(lotteryResult.fourthNumber);
      numbers.push(lotteryResult.fifthNumber);
      numbers.push(lotteryResult.sixthNumber);
      numbers.push(lotteryResult.bonusNumber);
    }
    const firstCharHash = {};
    firstCharHash['entire'] = numbers.length;
    for (const number of numbers) {
      const str = number.toString(10);
      const firstChar = str.slice(0, 1);
      firstCharHash[firstChar] = !firstCharHash[firstChar]
        ? 1
        : firstCharHash[firstChar] + 1;
    }
    const pValue = {};
    Object.keys(firstCharHash).forEach((v) => {
      pValue[`p-${v}`] = (firstCharHash[v] / firstCharHash['entire']) * 100;
    });
    return { ...firstCharHash, ...pValue };
  }
}
