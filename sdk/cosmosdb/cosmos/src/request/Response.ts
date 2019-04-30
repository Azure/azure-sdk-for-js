import { IHeaders } from "..";

export interface Response<T> {
  headers?: IHeaders;
  result?: T;
  statusCode?: number;
}
