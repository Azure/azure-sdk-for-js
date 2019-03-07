import { CosmosHeaders } from "../index";

export interface ErrorResponse {
  code?: number;
  substatus?: number;
  body?: any;
  headers?: CosmosHeaders;
  activityId?: string;
  retryAfterInMilliseconds?: number;
  [key: string]: any;
}
