// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MonitorContext, MonitorClientOptionalParams } from "./api/index.js";
import { createMonitor } from "./api/index.js";
import type { ObservabilityAgentsOperations } from "./classic/observabilityAgents/index.js";
import { _getObservabilityAgentsOperations } from "./classic/observabilityAgents/index.js";
import type { OperationsOperations } from "./classic/operations/index.js";
import { _getOperationsOperations } from "./classic/operations/index.js";
import type { TokenCredential } from "@azure/core-auth";
import type { Pipeline } from "@azure/core-rest-pipeline";

export type { MonitorClientOptionalParams } from "./api/monitorContext.js";

export class MonitorClient {
  private _client: MonitorContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  /** Monitor Agents Management Client */
  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options: MonitorClientOptionalParams = {},
  ) {
    this._client = createMonitor(credential, subscriptionId, options);
    this.pipeline = this._client.pipeline;
    this.observabilityAgents = _getObservabilityAgentsOperations(this._client);
    this.operations = _getOperationsOperations(this._client);
  }

  /** The operation groups for observabilityAgents */
  public readonly observabilityAgents: ObservabilityAgentsOperations;
  /** The operation groups for operations */
  public readonly operations: OperationsOperations;
}
