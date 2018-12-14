import { IHeaders } from "../index";

export interface Response<T> {
  headers?: IHeaders;
  result?: T;
  statusCode?: number;
}
