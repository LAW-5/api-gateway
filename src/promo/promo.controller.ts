import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  OnModuleInit,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { AuthGuard } from 'src/auth/auth.guard';
import {
  CreatePromoDto,
  CreatePromoPayload,
  DeletePromoDto,
  ListPromoDto,
  UsePromoDto,
} from './promo.dto';
import {
  CreatePromoResponse,
  DeletePromoResponse,
  ListPromoResponse,
  PromoServiceClient,
  PROMO_SERVICE_NAME,
  UsePromoResponse,
} from './promo.pb';

@ApiTags('promo')
@Controller('promo')
export class PromoController implements OnModuleInit {
  private svc: PromoServiceClient;

  @Inject(PROMO_SERVICE_NAME)
  private readonly client: ClientGrpc;

  public onModuleInit(): void {
    this.svc = this.client.getService<PromoServiceClient>(PROMO_SERVICE_NAME);
  }

  @Post('')
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard)
  @ApiBody({ description: 'Create promo dto', type: CreatePromoDto })
  @ApiResponse({ status: 201, description: 'Succesfully create promo' })
  private async create(
    @Body() body: CreatePromoDto,
    @Req() req: any,
  ): Promise<Observable<CreatePromoResponse>> {
    const payload: CreatePromoPayload = { ...body, merchantId: req.user };
    return this.svc.createPromo(payload);
  }

  @Get('/:merchantId')
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard)
  @ApiResponse({ status: 201, description: 'List promo of given merchant' })
  private async list(
    @Param('merchantId') merchantId,
  ): Promise<Observable<ListPromoResponse>> {
    const payload: ListPromoDto = { merchantId };
    return this.svc.listPromo(payload);
  }

  @Post('use')
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard)
  @ApiBody({ description: 'Use promo dto', type: UsePromoDto })
  @ApiResponse({ status: 201, description: 'Succesfully use promo' })
  @ApiResponse({ status: 404, description: 'No promo with given id' })
  @ApiResponse({ status: 402, description: 'Promo has reached its max use' })
  private async use(
    @Body() body: UsePromoDto,
  ): Promise<Observable<UsePromoResponse>> {
    return this.svc.usePromo(body);
  }

  @Delete('/')
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard)
  @ApiBody({ description: 'Delete promo dto', type: DeletePromoDto })
  @ApiResponse({ status: 201, description: 'Succesfully delete `promo' })
  @ApiResponse({ status: 404, description: 'No promo with given id' })
  private async delete(
    @Body() body: DeletePromoDto,
  ): Promise<Observable<DeletePromoResponse>> {
    return this.svc.deletePromo(body);
  }
}
