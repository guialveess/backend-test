import { Inject, Injectable } from '@nestjs/common';
import { PutCommand, ScanCommand, GetCommand, DeleteCommand, UpdateCommand } from '@aws-sdk/lib-dynamodb';
import { v4 as uuidv4 } from 'uuid';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  private readonly tableName = 'Users';

  constructor(@Inject('DYNAMO_CLIENT') private readonly dynamo) {}

  async create(data: CreateUserDto) {
    const user = { id: uuidv4(), ...data };
    await this.dynamo.send(new PutCommand({ TableName: this.tableName, Item: user }));
    return user;
  }

  async findAll() {
    const result = await this.dynamo.send(new ScanCommand({ TableName: this.tableName }));
    return result.Items;
  }

  async findOne(id: string) {
    const result = await this.dynamo.send(new GetCommand({ TableName: this.tableName, Key: { id } }));
    return result.Item;
  }

  async update(id: string, data: UpdateUserDto) {
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
