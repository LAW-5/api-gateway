import { ApiProperty } from '@nestjs/swagger';

export class CreatePromoDto {
  @ApiProperty()
  code: string;

  @ApiProperty()
  percentage: number;

  @ApiProperty()
  maxCut: number;

  @ApiProperty()
  maxUse: number;
}

export class CreatePromoPayload {
  @ApiProperty()
  merchantId: number;

  @ApiProperty()
  code: string;

  @ApiProperty()
  percentage: number;

  @ApiProperty()
  maxCut: number;

  @ApiProperty()
  maxUse: number;
}

export class ListPromoDto {
  @ApiProperty()
  merchantId: number;
}

export class UsePromoDto {
  @ApiProperty()
  id: number;
}

export class DeletePromoDto {
  @ApiProperty()
  id: number;
}
