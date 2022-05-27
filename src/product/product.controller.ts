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
import {
  ApiBearerAuth,
  ApiBody,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { EMPTY, Observable } from 'rxjs';
import { AuthGuard } from 'src/auth/auth.guard';
import {
  CreateProductDto,
  DeleteProductDto,
  EditProductDto,
  ListMerchantProductDto,
  ProductDetailDto,
  SearchProductDto,
} from './product.dto';
import {
  CreateProductResponse,
  DeleteProductResponse,
  EditProductResponse,
  ListProductResponse,
  ProductDetailResponse,
  ProductServiceClient,
  PRODUCT_SERVICE_NAME,
  SearchProductResponse,
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
  private async createProduct(
    @Body() body: CreateProductDto,
    @Req() req: any,
  ): Promise<Observable<CreateProductResponse>> {
    const payload: CreateProductDto = { ...body, merchantId: req.user };
    return this.svc.createProduct(payload);
  }

  @Get('')
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard)
  @ApiResponse({ status: 201, description: 'List all product' })
  private async listProduct(): Promise<Observable<ListProductResponse>> {
    return this.svc.listProduct('');
  }

  @Get('merchant')
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard)
  @ApiResponse({ status: 201, description: 'List all merchant product' })
  private async listMerchantProduct(
    @Req() req: any,
  ): Promise<Observable<ListProductResponse>> {
    const payload: ListMerchantProductDto = { id: req.user };
    return this.svc.listMerchantProduct(payload);
  }

  @Get('/:id')
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard)
  @ApiResponse({ status: 201, description: 'Get product detail' })
  @ApiResponse({ status: 404, description: 'Product not found' })
  private async productDetail(
    @Param('id') id: number,
  ): Promise<Observable<ProductDetailResponse>> {
    const param: ProductDetailDto = { id };
    return this.svc.productDetail(param);
  }

  @Put('/:id')
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard)
  @ApiBody({ description: 'Edit product dto', type: EditProductDto })
  @ApiResponse({ status: 201, description: 'Succesfully edit product' })
  @ApiResponse({ status: 404, description: 'Product not found' })
  private async editProduct(
    @Body() body: EditProductDto,
    @Param('id') id: number,
  ): Promise<Observable<EditProductResponse>> {
    const payload: EditProductDto = { ...body };
    payload.id = id;
    return this.svc.editProduct(payload);
  }

  @Delete('/:id')
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard)
  @ApiBody({ description: 'Delete product dto', type: DeleteProductDto })
  @ApiResponse({ status: 201, description: 'Succesfully delete product' })
  @ApiResponse({ status: 404, description: 'Product not found' })
  private async deleteProduct(
    @Body() body: DeleteProductDto,
  ): Promise<Observable<DeleteProductResponse>> {
    return this.svc.deleteProduct(body);
  }

  @Post('search')
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard)
  @ApiBody({ description: 'Search product dto', type: SearchProductDto })
  @ApiResponse({ status: 201, description: 'Product found' })
  private async searchProduct(
    @Body() body: SearchProductDto,
  ): Promise<Observable<SearchProductResponse>> {
    return this.svc.searchProduct(body);
  }
}
