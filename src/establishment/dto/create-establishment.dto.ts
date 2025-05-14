import { ApiProperty } from '@nestjs/swagger';

export class CreateEstablishmentDto {
  @ApiProperty({ example: 'Super Shopping' })
  name: string;

  @ApiProperty({ example: 'uuid-do-owner' })
  ownerId: string;

  @ApiProperty({ example: 'shopping', enum: ['shopping', 'local'] })
  type: 'shopping' | 'local';
}
