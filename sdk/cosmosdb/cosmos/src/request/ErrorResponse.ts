// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import type { CosmosDiagnostics, CosmosHeaders } from "../index";

export interface ErrorBody {
  code: string;
  message: string;
  /**
   * @hidden
   */
  additionalErrorInfo?: PartitionedQueryExecutionInfo;
}

/**
 * @hidden
 */
export interface PartitionedQueryExecutionInfo {
  partitionedQueryExecutionInfoVersion: number;
  queryInfo: QueryInfo;
  queryRanges: QueryRange[];
}

/**
 * @hidden
 */
export interface QueryRange {
  min: string;
  max: string;
  isMinInclusive: boolean;
  isMaxInclusive: boolean;
}

/**
 * @hidden
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
  /**
   * determines whether the query is of non streaming orderby type.
   */
  hasNonStreamingOrderBy: boolean;
}

export type GroupByExpressions = string[];

export type AggregateType = "Average" | "Count" | "Max" | "Min" | "Sum" | "MakeSet" | "MakeList";

export interface GroupByAliasToAggregateType {
  [key: string]: AggregateType;
}

export class ErrorResponse extends Error {
  code?: number | string;
  substatus?: number;
  body?: ErrorBody;
  headers?: CosmosHeaders;
  activityId?: string;
  retryAfterInMs?: number;
  retryAfterInMilliseconds?: number;
  [key: string]: any;
  diagnostics?: CosmosDiagnostics;
}
