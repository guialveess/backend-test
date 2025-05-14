import { PartialType } from '@nestjs/swagger';
import { CreateEstablishmentRuleDto } from './create-establishment-rule.dto';

export class UpdateEstablishmentRuleDto extends PartialType(CreateEstablishmentRuleDto) {}