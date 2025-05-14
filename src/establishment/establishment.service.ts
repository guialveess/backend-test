import { Inject, Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import {
  PutCommand,
  GetCommand,
  ScanCommand,
  DeleteCommand,
  UpdateCommand,
} from '@aws-sdk/lib-dynamodb';
import { CreateEstablishmentDto } from './dto/create-establishment.dto';
import { UpdateEstablishmentDto } from './dto/update-establishment.dto';

@Injectable()
export class EstablishmentService {
  private readonly establishmentTable = 'Establishments';
  private readonly userTable = 'Users';

  constructor(@Inject('DYNAMO_CLIENT') private readonly dynamo) {}

  async create(dto: CreateEstablishmentDto) {
    // valida se ownerId é um usuário tipo "owner"
    const owner = await this.dynamo.send(
      new GetCommand({ TableName: this.userTable, Key: { id: dto.ownerId } }),
    );

    if (!owner.Item) {
      throw new NotFoundException('Usuário (ownerId) não encontrado');
    }

    if (owner.Item.type !== 'owner') {
      throw new BadRequestException('Apenas usuários do tipo "owner" podem criar estabelecimentos');
    }

    const establishment = { id: uuidv4(), ...dto };

    await this.dynamo.send(
      new PutCommand({ TableName: this.establishmentTable, Item: establishment }),
    );

    return establishment;
  }

  async findAll() {
    const result = await this.dynamo.send(new ScanCommand({ TableName: this.establishmentTable }));
    return result.Items;
  }

  async findById(id: string) {
    const result = await this.dynamo.send(
      new GetCommand({ TableName: this.establishmentTable, Key: { id } }),
    );

    if (!result.Item) {
      throw new NotFoundException('Estabelecimento não encontrado');
    }

    return result.Item;
  }

  async findByType(type: 'shopping' | 'local') {
    const result = await this.dynamo.send(
      new ScanCommand({
        TableName: this.establishmentTable,
        FilterExpression: '#type = :type',
        ExpressionAttributeNames: { '#type': 'type' },
        ExpressionAttributeValues: { ':type': type },
      }),
    );
    return result.Items;
  }

  async update(id: string, dto: UpdateEstablishmentDto) {
    const updateExpr: string[] = [];
    const exprAttrValues = {};

    for (const key of Object.keys(dto)) {
      updateExpr.push(`${key} = :${key}`);
      exprAttrValues[`:${key}`] = dto[key];
    }

    const UpdateExpression = 'SET ' + updateExpr.join(', ');

    await this.dynamo.send(
      new UpdateCommand({
        TableName: this.establishmentTable,
        Key: { id },
        UpdateExpression,
        ExpressionAttributeValues: exprAttrValues,
      }),
    );

    return { id, ...dto };
  }

  async remove(id: string) {
    await this.dynamo.send(
      new DeleteCommand({ TableName: this.establishmentTable, Key: { id } }),
    );
    return { deleted: true };
  }
}
