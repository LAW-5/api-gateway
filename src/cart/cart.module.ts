import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { CartController } from './cart.controller';
import { CART_PACKAGE_NAME, CART_SERVICE_NAME } from './cart.pb';
import 'dotenv/config';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: CART_SERVICE_NAME,
        transport: Transport.GRPC,
        options: {
          url: process.env.ORDER_SERVICE,
          package: CART_PACKAGE_NAME,
          protoPath: 'node_modules/proto/cart.proto',
        },
      },
    ]),
  ],
  controllers: [CartController],
})
export class CartModule {}
