import { IHeaders } from "..";

export interface ErrorResponse {
  code?: number;
  substatus?: number;
  body?: any;
  headers?: IHeaders;
  activityId?: string;
  retryAfterInMilliseconds?: number;
  [key: string]: any;
}
