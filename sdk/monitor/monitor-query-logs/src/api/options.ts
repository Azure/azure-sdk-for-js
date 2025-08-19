// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure-rest/core-client";

/** Optional parameters for batch query operations. */
export interface LogsQueryBatchOptions extends OperationOptions {}

/**
 * Options for querying logs.
 */
export interface LogsQueryOptions extends OperationOptions {
  /**
   * A list of workspaces that are included in the query, except for the one set as the `workspaceId` parameter.
   * These may consist of the following identifier formats:
   * - Qualified workspace names
   * - Workspace IDs
   * - Azure resource IDs
   */
  additionalWorkspaces?: string[];
  /**
   * Results will also include statistics about the query.
   */
  includeQueryStatistics?: boolean;
  /**
   * Results will also include visualization information, in JSON format.
   */
  includeVisualization?: boolean;
  /**
   * The maximum amount of time the server will spend processing the query.
   * Default: 180 seconds (3 minutes), maximum allowed is 600 seconds (10 minutes)
   */
  serverTimeoutInSeconds?: number;
}

/** Optional parameters. */
export interface QueryLogsOptions extends OperationOptions {
  /**
   * Optional. The prefer header to set server timeout, query statistics and
   * visualization information.
   */
  prefer?: string;
}

/** Optional parameters. */
export interface ExecuteWithResourceIdOptionalParams extends QueryLogsOptions {}

/** Optional parameters. */
export interface ExecuteOptionalParams extends QueryLogsOptions {}
