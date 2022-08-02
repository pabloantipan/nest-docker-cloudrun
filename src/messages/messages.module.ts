import { MessagesController } from '@api/messages/messages.controller';
import { Module } from '@nestjs/common';

@Module({
  controllers: [MessagesController],
})
export class MessagesModule {}
