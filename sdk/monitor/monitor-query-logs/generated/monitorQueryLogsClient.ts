// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  createMonitorQueryLogs,
  MonitorQueryLogsContext,
  MonitorQueryLogsClientOptionalParams,
} from "./api/index.js";
import { batch, executeWithResourceId, execute } from "./api/operations.js";
import {
  BatchOptionalParams,
  ExecuteWithResourceIdOptionalParams,
  ExecuteOptionalParams,
} from "./api/options.js";
import {
  QueryBody,
  QueryResults,
  BatchRequest,
  BatchResponse,
} from "./models/models.js";
import { TokenCredential } from "@azure/core-auth";
import { Pipeline } from "@azure/core-rest-pipeline";

export { MonitorQueryLogsClientOptionalParams } from "./api/monitorQueryLogsContext.js";

export class MonitorQueryLogsClient {
  private _client: MonitorQueryLogsContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  constructor(
    credential: TokenCredential,
    options: MonitorQueryLogsClientOptionalParams = {},
  ) {
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._client = createMonitorQueryLogs(credential, {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
  }

  /**
   * Executes a batch of Analytics queries for data.
   * [Here](https://learn.microsoft.com/azure/azure-monitor/logs/api/batch-queries)
   * is an example for using POST with an Analytics query.
   */
  batch(
    body: BatchRequest,
    options: BatchOptionalParams = { requestOptions: {} },
  ): Promise<BatchResponse> {
    return batch(this._client, body, options);
  }

  /**
   * Executes an Analytics query for data in the context of a resource.
   * [Here](https://learn.microsoft.com/azure/azure-monitor/logs/api/azure-resource-queries)
   * is an example for using POST with an Analytics query.
   */
  executeWithResourceId(
    resourceId: string,
    body: QueryBody,
    options: ExecuteWithResourceIdOptionalParams = { requestOptions: {} },
  ): Promise<QueryResults> {
    return executeWithResourceId(this._client, resourceId, body, options);
  }

  /**
   * Executes an Analytics query for data.
   * [Here](https://learn.microsoft.com/azure/azure-monitor/logs/api/request-format)
   * is an example for using POST with an Analytics query.
   */
  execute(
    workspaceId: string,
    body: QueryBody,
    options: ExecuteOptionalParams = { requestOptions: {} },
  ): Promise<QueryResults> {
    return execute(this._client, workspaceId, body, options);
  }
}
