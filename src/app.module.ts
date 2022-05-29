import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { NotificationModule } from './notification/notification.module';
import { OrderModule } from './order/order.module';
import { PromoModule } from './promo/promo.module';

@Module({
  imports: [AuthModule, NotificationModule, PromoModule, OrderModule],
})
export class AppModule {}
