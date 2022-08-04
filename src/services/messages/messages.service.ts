import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
import { MessagesRepository } from '@repositories/messages/messages.repository';
// import { Message } from '@storage/message.emtity';

@Injectable()
export class MessagesService {
  constructor(public messagesRepository: MessagesRepository) {}

  findOne(id: string) {
    return this.messagesRepository.findOne(id);
  }

  findAll() {
    return this.messagesRepository.findAll();
  }

  create(content: string) {
    return this.messagesRepository.create(content);
  }
}
