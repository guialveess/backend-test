import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { DynamoModule } from '../database/dynamodb.module';

@Module({
  imports: [DynamoModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
