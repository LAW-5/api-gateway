import { ApiProperty } from '@nestjs/swagger';

export class CreateCartDto {
  @ApiProperty()
  merchantId: number;

  @ApiProperty()
  productId: number;

  @ApiProperty()
  quantity: number;
}

export class CreateCartPayload {
  @ApiProperty()
  userId: number;

  @ApiProperty()
  merchantId: number;

  @ApiProperty()
  productId: number;

  @ApiProperty()
  quantity: number;
}

export class ListCartDto {
  @ApiProperty()
  userId: number;
}

export class EditCartDto {
  @ApiProperty()
  id: number;
  
  @ApiProperty()
  quantity: number;
}

export class DeleteCartDto {
  @ApiProperty()
  id: number;
}
  
