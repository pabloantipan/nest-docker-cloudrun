import { MessagesController } from './messages.controller';
import { Module } from '@nestjs/common';
import { MessagesService } from '@services/messages/messages.service';
import { MessagesRepository } from '@repositories/messages/messages.repository';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { Message } from '@storage/message.emtity';

@Module({
  controllers: [MessagesController],
  providers: [MessagesService, MessagesRepository],
})
export class MessagesModule {}
