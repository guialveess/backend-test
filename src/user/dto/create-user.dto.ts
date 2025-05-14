import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'Guilherme Alves', description: 'Nome completo do usuário' })
  name: string;

  @ApiProperty({ example: '97guilherme.alves@gmail.com', description: 'E-mail válido do usuário' })
  email: string;

  @ApiProperty({
    example: 'owner',
    enum: ['owner', 'customer'],
    description: 'Tipo de usuário (owner ou customer)',
  })
  type: 'owner' | 'customer';
}
