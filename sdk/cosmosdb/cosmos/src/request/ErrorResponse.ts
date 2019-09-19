// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { CosmosHeaders } from "../index";

interface ErrorBody {
  code: string;
  message: string;
  /**
   * @ignore
   */
  additionalErrorInfo?: PartitionedQueryExecutionInfo;
}

/**
 * @ignore
 */
export interface PartitionedQueryExecutionInfo {
  partitionedQueryExecutionInfoVersion: number;
  queryInfo: QueryInfo;
  queryRanges: QueryRange[];
}

/**
 * @ignore
 */
interface QueryRange {
  min: string;
  max: string;
  isMinInclusive: boolean;
  isMaxInclusive: boolean;
}

/**
 * @ignore
 */
interface QueryInfo {
  top?: any;
  orderBy?: any[];
  orderByExpressions?: any[];
  offset?: number;
  limit?: number;
  aggregates?: any[];
  rewrittenQuery?: any;
  distinctType: string;
  hasSelectValue: boolean;
}

export interface ErrorResponse extends Error {
  code?: number;
  substatus?: number;
  body?: ErrorBody;
  headers?: CosmosHeaders;
  activityId?: string;
  retryAfterInMilliseconds?: number;
  [key: string]: any;
}
