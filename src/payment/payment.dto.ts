import { ApiProperty } from '@nestjs/swagger';

export class BalanceDetailDto {
  @ApiProperty()
  id: number;
}

export class TopUpDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  amount: number;
}

export class DecreaseBalanceDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  amount: number;
}
