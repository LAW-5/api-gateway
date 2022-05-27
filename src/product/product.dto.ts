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

  @ApiProperty()
  merchantId: number;
}

export class ListMerchantProductDto {
  @ApiProperty()
  id: number;
}

export class ProductDetailDto {
  @ApiProperty()
  id: number;
}

export class EditProductDto {
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

export class SearchProductDto {
  @ApiProperty()
  name: string;
}
