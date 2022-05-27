import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PROMO_PACKAGE_NAME } from 'src/promo/promo.pb';
import { ProductController } from './product.controller';
import { PRODUCT_SERVICE_NAME } from './product.pb';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: PRODUCT_SERVICE_NAME,
        transport: Transport.GRPC,
        options: {
          url: process.env.PROMO_SERVICE,
          package: PROMO_PACKAGE_NAME,
          protoPath: 'node_modules/proto/product.proto',
        },
      },
    ]),
  ],
  controllers: [ProductController],
})
export class PromoModule {}
