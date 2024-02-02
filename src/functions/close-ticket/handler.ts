import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';

import schema from './schema';
import { Issue } from 'src/domain/types/types';

const handler: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {

  let issues: Issue[] = event.body;

  return formatJSONResponse({
    toto: issues.length,
  });
};

export const main = middyfy(handler);