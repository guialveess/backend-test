import { ApiProperty } from '@nestjs/swagger';

export class CreateEstablishmentRuleDto {
  @ApiProperty({ example: 'uuid-do-estabelecimento' })
  establishmentId: string;

  @ApiProperty({ example: 5 })
  picturesLimit: number;

  @ApiProperty({ example: 2 })
  videoLimit: number;
}
