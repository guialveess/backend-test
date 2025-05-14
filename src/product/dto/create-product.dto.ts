import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({ example: 'Refrigerante Lata' })
  name: string;

  @ApiProperty({ example: 6.5 })
  price: number;

  @ApiProperty({ example: 'uuid-do-estabelecimento' })
  establishmentId: string;
}
