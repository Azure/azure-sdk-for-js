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
export interface QueryInfo {
  top?: any;
  orderBy?: any[];
  orderByExpressions?: any[];
  offset?: number;
  limit?: number;
  aggregates?: AggregateType[];
  groupByExpressions?: GroupByExpressions;
  groupByAliasToAggregateType: GroupByAliasToAggregateType;
  rewrittenQuery?: any;
  distinctType: string;
  hasSelectValue: boolean;
}

export type GroupByExpressions = string[];

export type AggregateType = "Average" | "Count" | "Max" | "Min" | "Sum";

export interface GroupByAliasToAggregateType {
  [key: string]: AggregateType;
}

export interface ErrorResponse extends Error {
  code?: number;
  substatus?: number;
  body?: ErrorBody;
  headers?: CosmosHeaders;
  activityId?: string;
  retryAfterInMs?: number;
  retryAfterInMilliseconds?: number;
  [key: string]: any;
}
