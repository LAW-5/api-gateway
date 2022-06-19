import { ApiProperty } from '@nestjs/swagger';

export class BalanceDetailDto {
  @ApiProperty()
  id: number;
}

export class TopUpDto {
  @ApiProperty()
  amount: number;
}

export class DecreaseBalanceDto {
  @ApiProperty()
  amount: number;
}
