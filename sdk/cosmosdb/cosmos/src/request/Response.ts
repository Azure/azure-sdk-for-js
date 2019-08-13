import { CosmosHeaders } from "../index";

/**
 * @ignore
 */
export interface Response<T> {
  headers: CosmosHeaders;
  result?: T;
  code?: number;
  substatus?: number;
}
