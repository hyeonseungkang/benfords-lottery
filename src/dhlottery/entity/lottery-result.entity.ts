import { Column } from 'typeorm';

export class LotteryResultEntity {
  @Column()
  lotNo!: number;

  @Column()
  firstNumber!: number;

  @Column()
  secondNumber!: number;

  @Column()
  thirdNumber!: number;

  @Column()
  fourthNumber!: number;

  @Column()
  fifthNumber!: number;

  @Column()
  sixthNumber!: number;

  @Column()
  bonusNumber!: number;

  @Column({ type: 'date' })
  lotDate!: Date;
}
