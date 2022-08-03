import { CreateMessageDto } from '@api/models/message.dto';
import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { MessagesService } from '@services/messages/messages.service';

@Controller('messages')
export class MessagesController {
  constructor(private messagesService: MessagesService) {}
  @Get()
  listMessages() {
    return this.messagesService.findAll();
  }

  @Post()
  createMessage(@Body() body: CreateMessageDto) {
    return this.messagesService.create(body.content);
  }

  @Get('/:id')
  getMessage(@Param('id') id: string) {
    return this.messagesService.findOne(id);
  }
}
