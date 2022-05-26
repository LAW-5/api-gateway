import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PromoController } from './promo.controller';
import { PROMO_PACKAGE_NAME, PROMO_SERVICE_NAME } from './promo.pb';
import 'dotenv/config';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: PROMO_SERVICE_NAME,
        transport: Transport.GRPC,
        options: {
          url: process.env.PROMO_SERVICE,
          package: PROMO_PACKAGE_NAME,
          protoPath: 'node_modules/proto/promo.proto',
        },
      },
    ]),
  ],
  controllers: [PromoController],
})
export class PromoModule {}
