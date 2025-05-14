import { Controller, Post, Get, Param, Body, Patch, Delete, Query } from '@nestjs/common';
import { EstablishmentService } from './establishment.service';
import { CreateEstablishmentDto } from './dto/create-establishment.dto';
import { UpdateEstablishmentDto } from './dto/update-establishment.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('establishments')
@Controller('establishments')
export class EstablishmentController {
  constructor(private readonly service: EstablishmentService) {}

  @Post()
  @ApiOperation({ summary: 'Criar novo estabelecimento (somente owner)' })
  create(@Body() dto: CreateEstablishmentDto) {
    return this.service.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os estabelecimentos' })
  findAll() {
    return this.service.findAll();
  }

  @Get('/by-type')
  @ApiOperation({ summary: 'Buscar estabelecimentos por tipo (shopping/local)' })
  findByType(@Query('type') type: 'shopping' | 'local') {
    return this.service.findByType(type);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar estabelecimento por ID' })
  findById(@Param('id') id: string) {
    return this.service.findById(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar estabelecimento por ID' })
  update(@Param('id') id: string, @Body() dto: UpdateEstablishmentDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deletar estabelecimento por ID' })
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
