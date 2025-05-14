import { Module } from '@nestjs/common';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
import * as dotenv from 'dotenv';

dotenv.config();

const dynamoProvider = {
  provide: 'DYNAMO_CLIENT',
  useFactory: () => {
    const client = new DynamoDBClient({
      region: process.env.AWS_REGION, 
      endpoint: process.env.DYNAMODB_ENDPOINT,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
      },
    });

    return DynamoDBDocumentClient.from(client);
  },
};

@Module({
  providers: [dynamoProvider],
  exports: [dynamoProvider],
})
export class DynamoModule {}
