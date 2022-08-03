import { MessagesController } from '@api/messages/messages.controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessagesRepository } from '@repositories/messages/messages.repository';

@Module({
  imports: [TypeOrmModule.forFeature([MessagesRepository])],
  controllers: [MessagesController],
})
export class MessagesModule {}
