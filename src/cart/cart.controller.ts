import {
    Body,
    Controller,
    Delete,
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
    CreateCartDto,
    CreateCartPayload,
    ListCartDto,
    EditCartDto,
    DeleteCartDto,
  } from './cart.dto';
  import {
    CreateCartResponse,
    ListCartResponse,
    EditCartResponse,
    DeleteCartResponse,
    CartServiceClient,
    CART_SERVICE_NAME,
  } from './cart.pb';
  
  @ApiTags('cart')
  @Controller('cart')
  export class CartController implements OnModuleInit {
    private svc: CartServiceClient;
  
    @Inject(CART_SERVICE_NAME)
    private readonly client: ClientGrpc;
  
    public onModuleInit(): void {
      this.svc = this.client.getService<CartServiceClient>(CART_SERVICE_NAME);
    }
  
    @Post('')
    @ApiBearerAuth('access-token')
    @UseGuards(AuthGuard)
    @ApiBody({ description: 'Create cart dto', type: CreateCartDto })
    @ApiResponse({ status: 201, description: 'Succesfully create cart' })
    private async create(
      @Body() body: CreateCartDto,
      @Req() req: any,
    ): Promise<Observable<CreateCartResponse>> {
      let payload: CreateCartPayload = { ...body, userId: req.user };
      return this.svc.createCart(payload);
    }
  
    @Get('')
    @ApiBearerAuth('access-token')
    @UseGuards(AuthGuard)
    @ApiResponse({ status: 201, description: 'List cart of given user' })
    private async listCart(@Req() req: any): Promise<Observable<ListCartResponse>> {
      const payload: ListCartDto = { userId: req.user };
      return this.svc.listCart(payload);
    }
  
    @Put('')
    @ApiBearerAuth('access-token')
    @UseGuards(AuthGuard)
    @ApiBody({ description: 'Edit cart dto', type: EditCartDto })
    @ApiResponse({ status: 201, description: 'Succesfully edit cart' })
    @ApiResponse({ status: 404, description: 'No cart data with given id' })
    private async editCart(
      @Body() body: EditCartDto,
    ): Promise<Observable<EditCartResponse>> {
      return this.svc.editCart(body);
    }

    @Delete('')
    @ApiBearerAuth('access-token')
    @UseGuards(AuthGuard)
    @ApiBody({ description: 'Delete cart dto', type: DeleteCartDto })
    @ApiResponse({ status: 201, description: 'Succesfully delete cart product' })
    @ApiResponse({ status: 404, description: 'No cart data with given id' })
    private async delete(
        @Body() body: DeleteCartDto,
    ): Promise<Observable<DeleteCartResponse>> {
        return this.svc.deleteCart(body);
    }
  }
  