import {
    Body,
    Controller,
    Get,
    Inject,
    OnModuleInit,
    Post,
    Put,
    Req,
    UseGuards,
  } from '@nestjs/common';
  import { ClientGrpc } from '@nestjs/microservices';
  import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
  import { Observable } from 'rxjs';
  import { AuthGuard } from 'src/auth/auth.guard';
  import {
    CreateOrderDto,
    CreateOrderPayload,
    ListOrderDto,
    ListMerchantOrderDto,
    EditOrderDto,
  } from './order.dto';
  import {
    CreateOrderResponse,
    ListOrderResponse,
    ListMerchantOrderResponse,
    EditOrderResponse,
    OrderServiceClient,
    ORDER_SERVICE_NAME,
  } from './order.pb';
  
  @ApiTags('order')
  @Controller('order')
  export class OrderController implements OnModuleInit {
    private svc: OrderServiceClient;
  
    @Inject(ORDER_SERVICE_NAME)
    private readonly client: ClientGrpc;
  
    public onModuleInit(): void {
      this.svc = this.client.getService<OrderServiceClient>(ORDER_SERVICE_NAME);
    }
  
    @Post('')
    @ApiBearerAuth('access-token')
    @UseGuards(AuthGuard)
    @ApiBody({ description: 'Create order dto', type: CreateOrderDto })
    @ApiResponse({ status: 201, description: 'Succesfully create order' })
    private async create(
      @Body() body: CreateOrderDto,
      @Req() req: any,
    ): Promise<Observable<CreateOrderResponse>> {
      let payload: CreateOrderPayload = { ...body, userId: req.user };
      return this.svc.createOrder(payload);
    }
  
    @Get('user')
    @ApiBearerAuth('access-token')
    @UseGuards(AuthGuard)
    @ApiResponse({ status: 201, description: 'List order of given user' })
    private async listOrder(@Req() req: any): Promise<Observable<ListOrderResponse>> {
      const payload: ListOrderDto = { userId: req.user };
      return this.svc.listOrder(payload);
    }
  
    @Get('merchant')
    @ApiBearerAuth('access-token')
    @UseGuards(AuthGuard)
    @ApiResponse({ status: 201, description: 'List order of given merchant' })
    private async listMerchantOrder(@Req() req: any): Promise<Observable<ListMerchantOrderResponse>> {
      const payload: ListMerchantOrderDto = { merchantId: req.user };
      return this.svc.listMerchantOrder(payload);
    }
  
    @Put('')
    @ApiBearerAuth('access-token')
    @UseGuards(AuthGuard)
    @ApiBody({ description: 'Edit order dto', type: EditOrderDto })
    @ApiResponse({ status: 201, description: 'Succesfully edit order' })
    @ApiResponse({ status: 404, description: 'No order with given id' })
    private async editOrder(
      @Body() body: EditOrderDto,
    ): Promise<Observable<EditOrderResponse>> {
      return this.svc.editOrder(body);
    }
  }
  