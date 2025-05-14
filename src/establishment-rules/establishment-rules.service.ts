import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { PutCommand, ScanCommand, GetCommand, DeleteCommand, UpdateCommand } from '@aws-sdk/lib-dynamodb';
import { v4 as uuidv4 } from 'uuid';
import { CreateEstablishmentRuleDto } from './dto/create-establishment-rule.dto';
import { UpdateEstablishmentRuleDto } from './dto/update-establishment-rule.dto';

@Injectable()
export class EstablishmentRulesService {
  private readonly tableName = 'EstablishmentRules';

  constructor(@Inject('DYNAMO_CLIENT') private readonly dynamo) {}

  async create(data: CreateEstablishmentRuleDto) {
    const rule = { id: uuidv4(), ...data };
    await this.dynamo.send(new PutCommand({ TableName: this.tableName, Item: rule }));
    return rule;
  }

  async findAll() {
    const result = await this.dynamo.send(new ScanCommand({ TableName: this.tableName }));
    return result.Items;
  }

  async findByEstablishmentId(establishmentId: string) {
    const result = await this.dynamo.send(
      new ScanCommand({
        TableName: this.tableName,
        FilterExpression: 'establishmentId = :id',
        ExpressionAttributeValues: { ':id': establishmentId },
      }),
    );
    return result.Items?.[0] ?? null;
  }

  async update(id: string, data: UpdateEstablishmentRuleDto) {
    const updateExpr: string[] = [];
    const exprAttrValues = {};
    for (const key of Object.keys(data)) {
      updateExpr.push(`${key} = :${key}`);
      exprAttrValues[`:${key}`] = data[key];
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

    return { id, ...data };
  }

  async remove(id: string) {
    await this.dynamo.send(new DeleteCommand({ TableName: this.tableName, Key: { id } }));
    return { deleted: true };
  }
}
