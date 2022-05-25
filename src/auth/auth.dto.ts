import { ApiProperty } from '@nestjs/swagger';

export class RegisterRequestDto {
  @ApiProperty()
  fullName: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;
}

export class LoginRequestDto {
  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;
}

export class RegisterMerchantDto {
  @ApiProperty()
  email: string;

  @ApiProperty()
  merchantName: string;

  @ApiProperty()
  password: string;
}
