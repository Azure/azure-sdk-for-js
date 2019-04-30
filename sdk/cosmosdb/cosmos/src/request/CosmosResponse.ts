import { IHeaders } from "../queryExecutionContext";

export interface CosmosResponse<T, U> {
  body?: T;
  headers?: IHeaders;
  ref?: U;
}
