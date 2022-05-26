import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { NotificationController } from './notification.controller';
import {
  NOTIFICATION_PACKAGE_NAME,
  NOTIFICATION_SERVICE_NAME,
} from './notification.pb';
import 'dotenv/config';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: NOTIFICATION_SERVICE_NAME,
        transport: Transport.GRPC,
        options: {
          url: process.env.NOTIFICATION_SERVICE,
          package: NOTIFICATION_PACKAGE_NAME,
          protoPath: 'node_modules/proto/notification.proto',
        },
      },
    ]),
  ],
  controllers: [NotificationController],
})
export class NotificationModule {}
