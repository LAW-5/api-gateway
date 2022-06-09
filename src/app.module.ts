import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { NotificationModule } from './notification/notification.module';
import { ProductModule } from './product/product.module';
import { PromoModule } from './promo/promo.module';
import { OrderModule } from './order/order.module';
import { CartModule } from './cart/cart.module';
import { PaymentModule } from './payment/payment.module';

@Module({
  imports: [
    AuthModule,
    NotificationModule,
    PromoModule,
    ProductModule,
    OrderModule,
    CartModule,
    PaymentModule,
  ],
})

export class AppModule {}
