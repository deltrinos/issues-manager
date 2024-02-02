import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';

import schema from './schema';
import { Request } from 'src/domain/types/types';
import addIssues from 'src/domain/issue/add-issues';
import { Mem } from 'src/adapters/redis/store';




const handler: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {

  let issues: Request[] = event.body;
  let pbs = await addIssues(issues);
  return formatJSONResponse({
    problems: pbs,
    counter: Mem.debug(),
  });
};

export const main = middyfy(handler);