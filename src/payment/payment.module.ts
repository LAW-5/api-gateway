import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PaymentController } from './payment.controller';
import { PAYMENT_PACKAGE_NAME, PAYMENT_SERVICE_NAME } from './payment.pb';
import 'dotenv/config';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: PAYMENT_SERVICE_NAME,
        transport: Transport.GRPC,
        options: {
          url: process.env.PAYMENT_SERVICE,
          package: PAYMENT_PACKAGE_NAME,
          protoPath: 'node_modules/proto/payment.proto',
        },
      },
    ]),
  ],
  controllers: [PaymentController],
})
export class PaymentModule {}
