import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DynamoModule } from './database/dynamodb.module';
import { EstablishmentRulesModule } from './establishment-rules/establishment-rules.module';
import { EstablishmentModule } from './establishment/establishment.module';
import { ProductModule } from './product/product.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [UserModule, DynamoModule, EstablishmentRulesModule, EstablishmentModule, ProductModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
