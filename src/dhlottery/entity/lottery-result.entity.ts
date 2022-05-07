import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class LotteryResultEntity {
  @PrimaryColumn()
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
