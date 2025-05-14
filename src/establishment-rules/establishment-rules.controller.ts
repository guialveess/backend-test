import { Controller, Post, Get, Param, Body, Patch, Delete } from '@nestjs/common';
import { EstablishmentRulesService } from './establishment-rules.service';
import { CreateEstablishmentRuleDto } from './dto/create-establishment-rule.dto';
import { UpdateEstablishmentRuleDto } from './dto/update-establishment-rule.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('establishment-rules')
@Controller('establishment-rules')
export class EstablishmentRulesController {
  constructor(private readonly service: EstablishmentRulesService) {}

  @Post()
  @ApiOperation({ summary: 'Criar regra para um estabelecimento' })
  create(@Body() dto: CreateEstablishmentRuleDto) {
    return this.service.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todas as regras' })
  findAll() {
    return this.service.findAll();
  }

  @Get(':establishmentId')
  @ApiOperation({ summary: 'Buscar regra por ID do estabelecimento' })
  findByEstablishment(@Param('establishmentId') id: string) {
    return this.service.findByEstablishmentId(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar regra por ID' })
  update(@Param('id') id: string, @Body() dto: UpdateEstablishmentRuleDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deletar regra por ID' })
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
