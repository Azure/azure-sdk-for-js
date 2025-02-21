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
  queryInfo?: QueryInfo;
  /**
   * Represents hybrid query information.
   */
  hybridSearchQueryInfo?: HybridSearchQueryInfo;
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

/**
 * @hidden
 * Represents the hybrid search query information
 */
export interface HybridSearchQueryInfo {
  /**
   * The query to be used for fetching global statistics
   */
  globalStatisticsQuery: string;
  /**
   * Query information for the subsequent queries
   */
  componentQueryInfos: QueryInfo[];
  /**
   * The number of results in the final result set
   */
  take: number;
  /**
   * The number of results to skip in the final result set
   */
  skip: number;
  /**
   * Whether the query requires global statistics
   */
  requiresGlobalStatistics: boolean;
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
