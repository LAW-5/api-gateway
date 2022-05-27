import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  OnModuleInit,
  Param,
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
  CreateProductDto,
  CreateProductPayload,
  DeleteProductDto,
  GetProductDto,
  ListProductDto,
  UpdateProductDto,
  UpdateProductPayload,
} from './product.dto';
import {
  CreateProductResponse,
  DeleteProductResponse,
  GetProductResponse,
  ListProductResponse,
  ProductServiceClient,
  PRODUCT_SERVICE_NAME,
  UpdateProductResponse,
} from './product.pb';

@ApiTags('product')
@Controller('product')
export class ProductController implements OnModuleInit {
  private svc: ProductServiceClient;

  @Inject(PRODUCT_SERVICE_NAME)
  private readonly client: ClientGrpc;

  public onModuleInit(): void {
    this.svc =
      this.client.getService<ProductServiceClient>(PRODUCT_SERVICE_NAME);
  }

  @Post('')
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard)
  @ApiBody({ description: 'Create product dto', type: CreateProductDto })
  @ApiResponse({ status: 201, description: 'Succesfully create product' })
  private async create(
    @Body() body: CreateProductDto,
    @Req() req: any,
  ): Promise<Observable<CreateProductResponse>> {
    const payload: CreateProductPayload = { ...body, merchantId: req.user };
    return this.svc.createProduct(payload);
  }

  @Get('')
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard)
  @ApiResponse({ status: 201, description: 'List product of given merchant' })
  private async list(
    @Req() req: any,
  ): Promise<Observable<ListProductResponse>> {
    const payload: ListProductDto = { merchantId: req.user };
    return this.svc.listProduct(payload);
  }

  @Get('/:id')
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard)
  @ApiResponse({ status: 201, description: 'Get product of given merchant' })
  @ApiResponse({ status: 404, description: 'Product not found' })
  private async get(
    @Req() req: any,
    @Param('id') id: number,
  ): Promise<Observable<GetProductResponse>> {
    const param: GetProductDto = { id };
    return this.svc.getProduct(param);
  }

  @Put('/:id')
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard)
  @ApiBody({ description: 'Update product dto', type: CreateProductDto })
  @ApiResponse({ status: 201, description: 'Succesfully update product' })
  @ApiResponse({ status: 404, description: 'Product not found' })
  private async update(
    @Body() body: UpdateProductDto,
    @Param('id') id: number,
  ): Promise<Observable<UpdateProductResponse>> {
    const payload: UpdateProductPayload = { id, ...body };
    return this.svc.updateProduct(payload);
  }

  @Delete('')
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard)
  @ApiBody({ description: 'Delete product dto', type: DeleteProductDto })
  @ApiResponse({ status: 201, description: 'Succesfully delete product' })
  @ApiResponse({ status: 404, description: 'Product not found' })
  private async delete(
    @Body() body: DeleteProductDto,
  ): Promise<Observable<DeleteProductResponse>> {
    return this.svc.deleteProduct(body);
  }
}
