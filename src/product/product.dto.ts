import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  stock: number;

  @ApiProperty()
  price: number;

  @ApiProperty()
  imageUrl: string;

  @ApiProperty()
  description: string;
}

export class CreateProductPayload {
  @ApiProperty()
  merchantId: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  stock: number;

  @ApiProperty()
  price: number;

  @ApiProperty()
  imageUrl: string;

  @ApiProperty()
  description: string;
}

export class ListProductDto {
  @ApiProperty()
  merchantId: number;
}

export class GetProductDto {
  @ApiProperty()
  id: number;
}

export class UpdateProductDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  stock: number;

  @ApiProperty()
  price: number;

  @ApiProperty()
  imageUrl: string;

  @ApiProperty()
  description: string;
}

export class UpdateProductPayload {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  stock: number;

  @ApiProperty()
  price: number;

  @ApiProperty()
  imageUrl: string;

  @ApiProperty()
  description: string;
}

export class DeleteProductDto {
  @ApiProperty()
  id: number;
}
