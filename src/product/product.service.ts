import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  PutCommand,
  GetCommand,
  DeleteCommand,
  UpdateCommand,
  ScanCommand,
} from '@aws-sdk/lib-dynamodb';
import { v4 as uuidv4 } from 'uuid';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  private readonly tableName = 'Products';
  private readonly establishmentTable = 'Establishments';

  constructor(@Inject('DYNAMO_CLIENT') private readonly dynamo) {}

  async create(dto: CreateProductDto) {
    const { establishmentId } = dto;

    const establishment = await this.dynamo.send(
      new GetCommand({
        TableName: this.establishmentTable,
        Key: { id: establishmentId },
      }),
    );

    if (!establishment.Item) {
      throw new NotFoundException('Establishment não encontrado');
    }

    // adicionar regra de negócio usando EstablishmentRules futuramente

    const product = { id: uuidv4(), ...dto };
    await this.dynamo.send(new PutCommand({ TableName: this.tableName, Item: product }));
    return product;
  }

  async findAll() {
    const result = await this.dynamo.send(new ScanCommand({ TableName: this.tableName }));
    return result.Items;
  }

  async findOne(id: string) {
    const result = await this.dynamo.send(new GetCommand({ TableName: this.tableName, Key: { id } }));
    if (!result.Item) throw new NotFoundException('Produto não encontrado');
    return result.Item;
  }

  async update(id: string, dto: UpdateProductDto) {
    const updateExpr: string[] = [];
    const exprAttrValues = {};
    for (const key of Object.keys(dto)) {
      updateExpr.push(`${key} = :${key}`);
      exprAttrValues[`:${key}`] = dto[key];
    }

    const UpdateExpression = 'SET ' + updateExpr.join(', ');

    await this.dynamo.send(
      new UpdateCommand({
        TableName: this.tableName,
        Key: { id },
        UpdateExpression,
        ExpressionAttributeValues: exprAttrValues,
      }),
    );

    return { id, ...dto };
  }

  async remove(id: string) {
    await this.dynamo.send(new DeleteCommand({ TableName: this.tableName, Key: { id } }));
    return { deleted: true };
  }
}
