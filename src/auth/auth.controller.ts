import { Body, Controller, Inject, OnModuleInit, Post } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import {
  LoginRequestDto,
  RegisterMerchantDto,
  RegisterRequestDto,
} from './auth.dto';
import {
  AuthServiceClient,
  AUTH_PACKAGE_NAME,
  AUTH_SERVICE_NAME,
  LoginRequest,
  LoginResponse,
  RegisterMerchantResponse,
  RegisterRequest,
  RegisterResponse,
} from './auth.pb';

@ApiTags('auth')
@Controller('auth')
export class AuthController implements OnModuleInit {
  private svc: AuthServiceClient;

  @Inject(AUTH_SERVICE_NAME)
  private readonly client: ClientGrpc;

  public onModuleInit(): void {
    this.svc = this.client.getService<AuthServiceClient>(AUTH_SERVICE_NAME);
  }

  @Post('register')
  @ApiBody({ description: 'Register request dto', type: RegisterRequestDto })
  @ApiResponse({ status: 201, description: 'Succesfully register' })
  @ApiResponse({
    status: 409,
    description: 'E-Mail already registered in other user',
  })
  private async register(
    @Body() body: RegisterRequest,
  ): Promise<Observable<RegisterResponse>> {
    return this.svc.register(body);
  }

  @Post('login')
  @ApiBody({ description: 'Login request dto', type: LoginRequestDto })
  @ApiResponse({ status: 201, description: 'Succesfully login' })
  @ApiResponse({ status: 404, description: 'No user with given email' })
  @ApiResponse({ status: 404, description: 'Wrong password' })
  private async login(
    @Body() body: LoginRequest,
  ): Promise<Observable<LoginResponse>> {
    return this.svc.login(body);
  }

  @Post('registerMerchant')
  @ApiBody({
    description: 'Reqister merchant request dto',
    type: RegisterMerchantDto,
  })
  @ApiResponse({ status: 201, description: 'Succesfully register' })
  @ApiResponse({
    status: 409,
    description: 'E-Mail already registered in other user',
  })
  private async registerMerchant(
    @Body() body: RegisterMerchantDto,
  ): Promise<Observable<RegisterMerchantResponse>> {
    return this.svc.registerMerchant(body);
  }
}
