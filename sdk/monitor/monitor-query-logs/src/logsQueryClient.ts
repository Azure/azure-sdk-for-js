// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MonitorQueryLogsContext, LogsQueryClientOptions } from "./api/index.js";
import { createMonitorQueryLogs } from "./api/index.js";
import type { QueryTimeInterval } from "./models/models.js";
import { convertQueryBatch } from "./models/models.js";
import type { QueryBatch, LogsQueryBatchResult } from "./models/public.js";
import type { QueryBody } from "./models/models.js";
import type { LogsQueryBatchOptions, LogsQueryOptions } from "./api/options.js";
import { batch as batchOperation, executeWithResourceId, execute } from "./api/operations.js";
import type { Pipeline } from "@azure/core-rest-pipeline";
import type { TokenCredential } from "@azure/core-auth";
import type { BatchQueryRequest } from "./models/index.js";
import { convertTimespanToInterval } from "./static-helpers/timespanConversion.js";
import type { LogsQueryResult } from "./models/public.js";

export { LogsQueryClientOptions } from "./api/monitorQueryLogsContext.js";

/**
 * Converts LogsQueryOptions to internal option format
 */
function convertToInternalOptions(options?: LogsQueryOptions): {
  prefer?: string;
  requestOptions: {};
} {
  if (!options) {
    return { requestOptions: {} };
  }

  // Convert LogsQueryOptions properties to prefer header format
  const preferParts: string[] = [];

  if (options.serverTimeoutInSeconds !== undefined) {
    preferParts.push(`wait=${options.serverTimeoutInSeconds}`);
  }

  if (options.includeQueryStatistics) {
    preferParts.push("include-statistics=true");
  }

  if (options.includeVisualization) {
    preferParts.push("include-render=true");
  }

  const prefer = preferParts.length > 0 ? preferParts.join(",") : undefined;

  return {
    prefer,
    requestOptions: options.requestOptions ? options.requestOptions : {},
  };
}

/**
 * The client to query Azure Monitor logs.
 */
export class LogsQueryClient {
  private _client: MonitorQueryLogsContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  /**
   * Initializes a new instance of the LogsQueryClient.
   * @param tokenCredential - The credential to use for authentication.
   * @param options - The optional parameters for the client.
   */
  constructor(tokenCredential: TokenCredential, options: LogsQueryClientOptions = {}) {
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._client = createMonitorQueryLogs(tokenCredential, {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
  }

  /**
   * Executes a batch of Analytics queries for data.
   * [Here](https://learn.microsoft.com/azure/azure-monitor/logs/api/batch-queries)
   * is an example for using POST with an Analytics query.
   * @param batch - The batch of queries to execute.
   * @param options - The optional parameters for the operation.
   * @returns The results of the batch of queries.
   */
  queryBatch(
    batch: QueryBatch[],
    options: LogsQueryBatchOptions = { requestOptions: {} },
  ): Promise<LogsQueryBatchResult> {
    const requests: BatchQueryRequest[] = batch.map((q, index) => {
      // Generate a unique ID for each query
      const id = `query-${index}`;
      // Convert public QueryBatch to internal InternalQueryBatch
      const internalQuery = convertQueryBatch(q, id);

      return {
        id: internalQuery.id,
        body: {
          query: internalQuery.query,
          timespan: internalQuery.timespan
            ? convertTimespanToInterval(internalQuery.timespan)
            : undefined,
          workspaces: internalQuery.workspaces,
        },
        path: "/query" as const,
        method: "POST" as const,
        workspace: internalQuery.workspace,
        headers: internalQuery.headers,
      };
    });
    return batchOperation(this._client, { requests: requests }, options);
  }

  /**
   * Executes an Analytics query for data in the context of a resource.
   * [Here](https://learn.microsoft.com/azure/azure-monitor/logs/api/azure-resource-queries)
   * is an example for using POST with an Analytics query.
   * @param resourceId - The resource ID to query the data for.
   * @param query - The query to execute.
   * @param timespan - The timespan for the query.
   * @param options - The optional parameters for the operation.
   * @returns The results of the query.
   */
  queryResource(
    resourceId: string,
    query: string,
    timespan: QueryTimeInterval,
    // eslint-disable-next-line @azure/azure-sdk/ts-naming-options
    options?: LogsQueryOptions,
  ): Promise<LogsQueryResult> {
    const internalOptions = convertToInternalOptions(options);
    const body: QueryBody = {
      query,
      timespan: convertTimespanToInterval(timespan),
      workspaces: options?.additionalWorkspaces,
    };
    return executeWithResourceId(this._client, resourceId, body, internalOptions);
  }

  /**
   * Executes an Analytics query for data.
   * [Here](https://learn.microsoft.com/azure/azure-monitor/logs/api/request-format)
   * is an example for using POST with an Analytics query.
   * @param workspaceId - The workspace ID to query the data for.
   * @param query - The query to execute.
   * @param timespan - The timespan for the query.
   * @param options - The optional parameters for the operation.
   * @returns The results of the query.
   */
  queryWorkspace(
    workspaceId: string,
    query: string,
    timespan: QueryTimeInterval,
    // eslint-disable-next-line @azure/azure-sdk/ts-naming-options
    options?: LogsQueryOptions,
  ): Promise<LogsQueryResult> {
    const internalOptions = convertToInternalOptions(options);
    const body: QueryBody = {
      query,
      timespan: convertTimespanToInterval(timespan),
      workspaces: options?.additionalWorkspaces,
    };
    return execute(this._client, workspaceId, body, internalOptions);
  }
}
