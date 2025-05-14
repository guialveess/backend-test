import { DynamoDBClient, CreateTableCommand } from '@aws-sdk/client-dynamodb';
import * as dotenv from 'dotenv';

dotenv.config();

const client = new DynamoDBClient({
  region: process.env.AWS_REGION,
  endpoint: process.env.DYNAMODB_ENDPOINT,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

async function createTable() {
  try {
    const command = new CreateTableCommand({
      TableName: 'Products',
      AttributeDefinitions: [{ AttributeName: 'id', AttributeType: 'S' }],
      KeySchema: [{ AttributeName: 'id', KeyType: 'HASH' }],
      ProvisionedThroughput: {
        ReadCapacityUnits: 5,
        WriteCapacityUnits: 5,
      },
    });

    await client.send(command);
    console.log('Tabela "Products" criada com sucesso');
  } catch (err: any) {
    if (err.name === 'ResourceInUseException') {
      console.log('A tabela "Products" já existe.');
    } else {
      console.error('Erro ao criar tabela:', err);
    }
  }
}

createTable();
