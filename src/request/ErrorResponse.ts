import { CosmosHeaders } from "../index";

interface ErrorBody {
  code: string;
  message: string;
  additionalErrorInfo?: PartitionedQueryExecutionInfo;
}

export interface PartitionedQueryExecutionInfo {
  partitionedQueryExecutionInfoVersion: number;
  queryInfo: QueryInfo;
  queryRanges: any[]; // TODO add types
}

interface QueryInfo {
  top?: any;
  orderBy?: any;
  aggregates?: any;
  rewrittenQuery?: any;
}

export interface ErrorResponse {
  code?: number;
  substatus?: number;
  body?: ErrorBody;
  headers?: CosmosHeaders;
  activityId?: string;
  retryAfterInMilliseconds?: number;
  [key: string]: any;
}
