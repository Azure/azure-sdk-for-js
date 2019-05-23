import { CosmosHeaders } from "../index";

export interface Response<T> {
  headers: CosmosHeaders;
  result?: T;
  statusCode?: number;
}
