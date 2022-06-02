import {
  Body,
  Controller,
  Get,
  Inject,
  OnModuleInit,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { AuthGuard } from 'src/auth/auth.guard';
import { BalanceDetailDto, DecreaseBalanceDto, TopUpDto } from './payment.dto';
import {
  BalanceDetailResponse,
  DecreaseBalanceResponse,
  PaymentServiceClient,
  PAYMENT_SERVICE_NAME,
  TopUpResponse,
} from './payment.pb';

@ApiTags('payment')
@Controller('payment')
export class PaymentController implements OnModuleInit {
  private svc: PaymentServiceClient;

  @Inject(PAYMENT_SERVICE_NAME)
  private readonly client: ClientGrpc;

  public onModuleInit(): void {
    this.svc =
      this.client.getService<PaymentServiceClient>(PAYMENT_SERVICE_NAME);
  }

  @Get('')
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard)
  @ApiBody({ description: 'Get Balance Detail DTO', type: BalanceDetailDto })
  @ApiResponse({ status: 200, description: 'Succesfully get balance detail' })
  private async getBalance(
    @Req() req: BalanceDetailDto,
  ): Promise<Observable<BalanceDetailResponse>> {
    const payload: BalanceDetailDto = { id: req.id };
    return this.svc.getBalanceDetail(payload);
  }

  @Post('top-up')
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard)
  @ApiBody({ description: 'Top up dto', type: TopUpDto })
  @ApiResponse({ status: 201, description: 'Successfully top up' })
  private async topUp(
    @Body() body: TopUpDto,
  ): Promise<Observable<TopUpResponse>> {
    return this.svc.topUp(body);
  }

  @Post('decrease-balance')
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard)
  @ApiBody({ description: 'Decrease Balance dto', type: DecreaseBalanceDto })
  @ApiResponse({ status: 201, description: 'Successfully Decrease Balance' })
  private async decreaseBalance(
    @Body() body: DecreaseBalanceDto,
  ): Promise<Observable<DecreaseBalanceResponse>> {
    return this.svc.decreaseBalance(body);
  }
}
