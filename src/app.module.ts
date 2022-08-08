import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MessagesModule } from './messages/messages.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';
import { UsersController } from './services/users/users.controller';
import { ReportsController } from './services/reports/reports.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [],
      synchronize: true,
    }),
    MessagesModule,
    UsersModule,
    ReportsModule,
  ],
  controllers: [AppController, UsersController, ReportsController],
  providers: [AppService],
})
export class AppModule {}
