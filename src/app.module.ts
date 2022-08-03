import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MessagesModule } from './messages/messages.module';
import { MessagesController } from './api/messages/messages.controller';
import { MessagesService } from './services/messages/messages.service';

@Module({
  imports: [MessagesModule],
  controllers: [AppController, MessagesController],
  providers: [AppService, MessagesService],
})
export class AppModule {}
