import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDto {
  @ApiProperty()
  merchantId: number;

  @ApiProperty()
  productId: number;

  @ApiProperty()
  quantity: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  address: string;

  @ApiProperty()
  promoId: number[];

  @ApiProperty()
  orderStatus: string;
}

export class CreateOrderPayload {
  @ApiProperty()
  userId: number;

  @ApiProperty()
  merchantId: number;

  @ApiProperty()
  productId: number;

  @ApiProperty()
  quantity: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  address: string;

  @ApiProperty()
  promoId: number[];

  @ApiProperty()
  orderStatus: string;
}

export class ListOrderDto {
  @ApiProperty()
  userId: number;
}

export class ListMerchantOrderDto {
  @ApiProperty()
  merchantId: number;
}

export class EditOrderDto {
  @ApiProperty()
  id: number;
  
  @ApiProperty()
  orderStatus: string;
}
