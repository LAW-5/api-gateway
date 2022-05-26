import {
  Controller,
  Inject,
  OnModuleInit,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { AuthGuard } from 'src/auth/auth.guard';
import {
  ListRequest,
  ListResponse,
  NotificationServiceClient,
  NOTIFICATION_SERVICE_NAME,
} from './notification.pb';

@ApiTags('notification')
@Controller('notification')
export class NotificationController implements OnModuleInit {
  private svc: NotificationServiceClient;

  @Inject(NOTIFICATION_SERVICE_NAME)
  private readonly client: ClientGrpc;

  public onModuleInit(): void {
    this.svc = this.client.getService<NotificationServiceClient>(
      NOTIFICATION_SERVICE_NAME,
    );
  }

  @Post('list')
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard)
  @ApiResponse({ status: 201, description: 'list of user notification' })
  private async list(@Req() req: any): Promise<Observable<ListResponse>> {
    const body: ListRequest = { userId: req.user };
    return this.svc.list(body);
  }
}
