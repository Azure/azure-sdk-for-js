// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { OperationOptions } from "@azure/core-client";
import { ErrorDetail, LogsColumnType } from "../generated/logquery/src";
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
  /**
   * If true, will cause this operation to throw if query operation did not succeed.
   */
  throwOnAnyFailure?: boolean;
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

/** The code and message for an error. */
export interface ErrorInfo extends Error {
  /** A machine readable error code. */
  code: string;
  /** A human readable error message. */
  message: string;
  /** error details. */
  details?: ErrorDetail[];
  /** Inner error details if they exist. */
  innerError?: ErrorInfo;
  /** Additional properties that can be provided on the error info object */
  additionalProperties?: Record<string, unknown>;
}

export class BatchError extends Error implements ErrorInfo {
  /** A machine readable error code. */
  code: string;
  /** A human readable error message. */
  message: string;
  /** error details. */
  details?: ErrorDetail[];
  /** Inner error details if they exist. */
  innerError?: ErrorInfo;
  /** Additional properties that can be provided on the error info object */
  additionalProperties?: Record<string, unknown>;

  constructor(errorInfo: ErrorInfo) {
    super();
    this.name = "Error";
    this.code = errorInfo.code;
    this.message = errorInfo.message;
    this.details = errorInfo.details;
    this.innerError = errorInfo.innerError;
    this.additionalProperties = errorInfo.additionalProperties;
  }
}
export class AggregateBatchError extends Error {
  errors: BatchError[];
  constructor(errors: ErrorInfo[]) {
    super();
    this.errors = errors.map((x) => new BatchError(x));
  }
}
/**
 * Tables and statistic results from a logs query.
 */

export interface LogsQueryResult {
  /** Populated results from the query. */
  tables: LogsTable[];
  /** error information for partial errors or failed queries */
  error?: ErrorInfo;
  /** Indicates if a query succeeded or failed or partially failed.
   * Represented by "Partial" | "Success" | "Failed".
   * For partially failed queries, users can find data in "tables" attribute
   * and error information in "error" attribute */
  status: LogsQueryResultStatus;
  /** Statistics represented in JSON format. */
  statistics?: Record<string, unknown>;
  /** Visualization data in JSON format. */
  visualization?: Record<string, unknown>;
}

/** Configurable HTTP request settings and `throwOnAnyFailure` setting for the Logs query batch operation. */
export interface LogsQueryBatchOptions extends OperationOptions {
  /**
   * If true, will cause the batch operation to throw if any query operations in the batch did not succeed.
   */
  throwOnAnyFailure?: boolean;
}

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
  timespan: TimeInterval;
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
  results: {
    /** Populated results from the query */
    tables?: LogsTable[];
    /** error information for partial errors or failed queries */
    error?: ErrorInfo;
    /** Indicates if a query succeeded or failed or partially failed.
     * Represented by "Partial" | "Success" | "Failed".
     * For partially failed queries, users can find data in "tables" attribute
     * and error information in "error" attribute */
    status?: LogsQueryResultStatus;
    /** Statistics represented in JSON format. */
    statistics?: Record<string, unknown>;
    /** Visualization data in JSON format. */
    visualization?: Record<string, unknown>;
  }[];
}

/** Indicates if a query succeeded or failed or partially failed.
 * Represented by "Partial" | "Success" | "Failed".
 * For partially failed queries, users can find data in "tables" attribute
 * and error information in "error" attribute */
export type LogsQueryResultStatus = "Partial" | "Success" | "Failed";

/** Contains the columns and rows for one table in a query response. */
export interface LogsTable {
  /** The name of the table. */
  name: string;
  /** The list of columns in this table. */
  columnDescriptors: LogsColumn[];
  /** The two dimensional array of results from this query indexed by row and column. */
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
