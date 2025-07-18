// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MonitorQueryLogsContext, LogsQueryClientOptions } from "./api/index.js";
import { createMonitorQueryLogs } from "./api/index.js";
import type {
  LogsQueryBatchResult,
  QueryBatch,
  QueryTimeInterval,
} from "./models/models.js";
import type { QueryBody } from "./models/models.js";
import type {
  BatchOptionalParams,
  ExecuteWithResourceIdOptionalParams,
  ExecuteOptionalParams,
} from "./api/options.js";
import { batch, executeWithResourceId, execute } from "./api/operations.js";
import type { Pipeline } from "@azure/core-rest-pipeline";
import type { TokenCredential } from "@azure/core-auth";
import type { LogsQueryResult } from "./models/index.js";

export { LogsQueryClientOptions } from "./api/monitorQueryLogsContext.js";

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
   * @param queries - The batch of queries to execute.
   * @param options - The optional parameters for the operation.
   * @returns The results of the batch of queries.
   */
  queryBatch(
    queries: QueryBatch[],
    options: BatchOptionalParams = { requestOptions: {} },
  ): Promise<LogsQueryBatchResult> {
    const requests = queries.map((q) => {
      return {
        id: q.id,
        body: {
          query: q.query,
          timespan: q.timespan,
          workspaces: q.workspaces,
        },
        path: "/query" as const,
        method: "POST" as const,
        workspace: q.workspace,
        headers: q.headers,
      };
    });
    return batch(this._client, { requests }, options);
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
    options: ExecuteWithResourceIdOptionalParams = { requestOptions: {} },
  ): Promise<LogsQueryResult> {
    const body: QueryBody = {
      query,
      timespan,
    };
    return executeWithResourceId(this._client, resourceId, body, options);
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
    options: ExecuteOptionalParams = { requestOptions: {} },
  ): Promise<LogsQueryResult> {
    const body: QueryBody = {
      query,
      timespan,
    };
    return execute(this._client, workspaceId, body, options);
  }
}
