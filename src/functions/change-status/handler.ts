import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';

import schema from './schema';
import { Problem, ProblemStatus } from 'src/domain/types/types';
import changeStatus from 'src/domain/issue/change-status';

const handler: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {

  const targetStatus = event.pathParameters.status

  let isStatus = false
  if (targetStatus in ProblemStatus) {
    isStatus = true
  } else {
    throw new Error(targetStatus + " is not a valid problem status")
  }

  const ids: string[] = event.body
  const pbs: Problem[] = []

  for (var i in ids) {
    let res = await changeStatus(ids[i], ProblemStatus[targetStatus]).then((pb) => {
      console.log("tout tout ", pb)
      pbs.push(pb)
    })
    console.log("res res", res)
  }


  return formatJSONResponse({
    status: targetStatus,
    isStatus: isStatus,
    problems: pbs
  });
};

export const main = middyfy(handler);