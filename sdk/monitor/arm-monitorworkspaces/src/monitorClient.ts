// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MonitorContext, MonitorClientOptionalParams, createMonitor } from "./api/index.js";
import {
  AzureMonitorWorkspacesOperations,
  _getAzureMonitorWorkspacesOperations,
} from "./classic/azureMonitorWorkspaces/index.js";
import { IssueOperations, _getIssueOperations } from "./classic/issue/index.js";
import {
  MetricsContainersOperations,
  _getMetricsContainersOperations,
} from "./classic/metricsContainers/index.js";
import { OperationsOperations, _getOperationsOperations } from "./classic/operations/index.js";
import { TokenCredential } from "@azure/core-auth";
import { Pipeline } from "@azure/core-rest-pipeline";

export type { MonitorClientOptionalParams } from "./api/monitorContext.js";

export class MonitorClient {
  private _client: MonitorContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options: MonitorClientOptionalParams = {},
  ) {
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._client = createMonitor(credential, subscriptionId, {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.metricsContainers = _getMetricsContainersOperations(this._client);
    this.issue = _getIssueOperations(this._client);
    this.azureMonitorWorkspaces = _getAzureMonitorWorkspacesOperations(this._client);
    this.operations = _getOperationsOperations(this._client);
  }

  /** The operation groups for metricsContainers */
  public readonly metricsContainers: MetricsContainersOperations;
  /** The operation groups for issue */
  public readonly issue: IssueOperations;
  /** The operation groups for azureMonitorWorkspaces */
  public readonly azureMonitorWorkspaces: AzureMonitorWorkspacesOperations;
  /** The operation groups for operations */
  public readonly operations: OperationsOperations;
}
