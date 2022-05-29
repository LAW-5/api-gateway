import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { NotificationModule } from './notification/notification.module';
import { ProductModule } from './product/product.module';
import { PromoModule } from './promo/promo.module';
import { OrderModule } from './order/order.module';

@Module({
  imports: [AuthModule, NotificationModule, PromoModule, ProductModule, OrderModule],
})

export class AppModule {}
