import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { DynamoModule } from '../database/dynamodb.module';

@Module({
  imports: [DynamoModule],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
