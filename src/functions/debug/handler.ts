import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { Mem } from 'src/adapters/redis/store';


const handler: ValidatedEventAPIGatewayProxyEvent<typeof undefined> = async (event) => {

  let res = {}
  const id = event.pathParameters.id
  if (id) {
    let idStr = await Mem.get(id)
    if (idStr) {
      res[id] = JSON.parse(idStr)
    }
  }
  res["debug"] = await Mem.debug()


  return formatJSONResponse(res);
};

export const main = middyfy(handler);