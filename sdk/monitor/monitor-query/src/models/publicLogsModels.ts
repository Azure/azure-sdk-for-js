// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { OperationOptions } from "@azure/core-client";
import { ErrorInfo, LogsColumnType } from "../generated/logquery/src";
import { TimeInterval } from "./timeInterval";

// https://dev.loganalytics.io/documentation/Using-the-API/RequestOptions
// https://dev.loganalytics.io/documentation/Using-the-API/Timeouts

/**
 * Options for querying logs.
 */
export interface LogsQueryOptions extends OperationOptions {
  /**
   * A list of workspaces that are included in the query, except for the one set as the `workspaceId` parameter
   * These may consist of the following identifier formats:
   * - Qualified workspace names
   * - Workspace IDs
   * - Azure resource IDs
   */
  additionalWorkspaces?: string[];
  /**
   * The maximum amount of time the server will spend processing the query.
   * Default: 180 seconds (3 minutes), maximum allowed is 600 seconds (10 minutes)
   */
  serverTimeoutInSeconds?: number;

  /**
   * Results will also include statistics about the query.
   */
  includeQueryStatistics?: boolean; // TODO: this data is not modeled in the current response object.

  /**
   * Results will also include visualization information, in JSON format.
   */
  includeVisualization?: boolean;
}

/**
 * @internal
 */
export interface QueryStatistics {
  query?: {
    executionTime?: number;
    [key: string]: unknown;
  };
  [key: string]: unknown;
}

/**
 * Tables and statistic results from a logs query.
 */
export interface LogsQueryResult {
  /** The list of tables, columns and rows. */
  tables: LogsTable[];
  /** Statistics represented in JSON format. */
  statistics?: Record<string, unknown>;
  /** Visualization data in JSON format. */
  visualization?: Record<string, unknown>;
  /** The code and message for an error. */
  error?: ErrorInfo;
}

/** Configurable HTTP request settings for the Logs query batch operation. */
export type LogsQueryBatchOptions = OperationOptions;

/** The Analytics query. Learn more about the [Analytics query syntax](https://azure.microsoft.com/documentation/articles/app-insights-analytics-reference/) */
// NOTE: 'id' is added automatically by our LogsQueryClient.
export interface QueryBatch {
  /** The workspace for this query. */
  workspaceId: string;

  // TODO: having both this and the workspaceId field co-exist on the same model seems really
  // confusing. However, this is similar to what we're offering in other languages as well.

  /** The query to execute. */
  query: string;
  /** The timespan over which to query data. This timespan is applied in addition to any that are specified in the query expression. */
  timespan?: TimeInterval;
  /**
   * A list of workspaces that are included in the query, except for the one set as the `workspaceId` parameter
   * These may consist of the following identifier formats:
   * - Qualified workspace names
   * - Workspace IDs
   * - Azure resource IDs
   */
  additionalWorkspaces?: string[];
  /**
   * The maximum amount of time the server will spend processing the query.
   * Default: 180 seconds (3 minutes), maximum allowed is 600 seconds (10 minutes)
   */
  serverTimeoutInSeconds?: number;

  /**
   * Results will also include statistics about the query.
   */
  includeQueryStatistics?: boolean; // TODO: this data is not modeled in the current response object.

  /**
   * Results will also include visualization information, in JSON format.
   */
  includeVisualization?: boolean;
}

/** Results for a batch query. */
export interface LogsQueryBatchResult {
  /** An array of responses corresponding to each individual request in a batch. */
  results?: {
    id?: string;
    status?: number;
    /** The list of tables, columns and rows. */
    // (hoisted up from `LogQueryResult`)
    tables?: LogsTable[];
    error?: ErrorInfo;
    /** Statistics represented in JSON format. */
    statistics?: Record<string, unknown>;
    /** Visualization data in JSON format. */
    visualization?: Record<string, unknown>;
  }[];

  // TODO: this is omitted from the Java models.
  /** Error response for a batch request */
  // error?: BatchResponseError;
}

/** Contains the columns and rows for one table in a query response. */
export interface LogsTable {
  /** The name of the table. */
  name: string;
  /** The list of columns in this table. */
  columns: LogsColumn[];
  /** The resulting rows from this query. */
  rows: (Date | string | number | Record<string, unknown> | boolean)[][];
}

/** A column in a table. */
export interface LogsColumn {
  /** The name of this column. */
  name?: string;
  /** The data type of this column.
   * Defines values for LogsColumnType.
   * {@link KnownLogsColumnType} can be used interchangeably with LogsColumnType,
   *  this enum contains the known values that the service supports.
   * ### Known values supported by the service
   * **bool**
   * **datetime**
   * **dynamic**
   * **int**
   * **long**
   * **real**
   * **string**
   * **guid**
   * **decimal**
   * **timespan**
   */
  type?: LogsColumnType;
}
