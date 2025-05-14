import { Module } from '@nestjs/common';
import { EstablishmentRulesService } from './establishment-rules.service';
import { EstablishmentRulesController } from './establishment-rules.controller';
import { DynamoModule } from '../database/dynamodb.module';

@Module({
  imports: [DynamoModule],
  controllers: [EstablishmentRulesController],
  providers: [EstablishmentRulesService],
})
export class EstablishmentRulesModule {}
