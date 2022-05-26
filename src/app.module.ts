import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { NotificationModule } from './notification/notification.module';
import { PromoModule } from './promo/promo.module';

@Module({
  imports: [AuthModule, NotificationModule, PromoModule],
})
export class AppModule {}
