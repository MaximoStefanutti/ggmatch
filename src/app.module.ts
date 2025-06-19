import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { UsersModule } from './users/users.module';
import { GamesModule } from './games/games.module';
import { AuthModule } from './auth/auth.module';
import { CofigModule } from './cofig/cofig.module';
import { NotificationsModule } from './notifications/notifications.module';
import { ChatModule } from './chat/chat.module';
import { PaymanModule } from './payman/payman.module';
import { SubscriptionModule } from './subscription/subscription.module';
import { AdminModule } from './admin/admin.module';
import { CofigModule } from './cofig/cofig.module';

@Module({
  imports: [UserModule, UsersModule, GamesModule, AuthModule, CofigModule, AdminModule, SubscriptionModule, PaymanModule, ChatModule, NotificationsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
