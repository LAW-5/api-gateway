import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ProductController } from './product.controller';
import { PRODUCT_PACKAGE_NAME, PRODUCT_SERVICE_NAME } from './product.pb';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: PRODUCT_SERVICE_NAME,
        transport: Transport.GRPC,
        options: {
          url: process.env.PROMO_SERVICE,
          package: PRODUCT_PACKAGE_NAME,
          protoPath: 'node_modules/proto/product.proto',
        },
      },
    ]),
  ],
  controllers: [ProductController],
})
export class ProductModule {}
