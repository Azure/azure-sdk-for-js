// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { EdgeOperatorContext, EdgeOperatorClientOptionalParams } from "./api/index.js";
import { createEdgeOperator } from "./api/index.js";
import type { OperationsOperations } from "./classic/operations/index.js";
import { _getOperationsOperations } from "./classic/operations/index.js";
import type { SystemReadinessOperationsOperations } from "./classic/systemReadinessOperations/index.js";
import { _getSystemReadinessOperationsOperations } from "./classic/systemReadinessOperations/index.js";
import type { TokenCredential } from "@azure/core-auth";
import type { Pipeline } from "@azure/core-rest-pipeline";

export type { EdgeOperatorClientOptionalParams } from "./api/edgeOperatorContext.js";

export class EdgeOperatorClient {
  private _client: EdgeOperatorContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  /** Microsoft.EdgeOperator Resource Provider management API for Azure Local Disconnected Operations (ALDO) system readiness. */
  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options: EdgeOperatorClientOptionalParams = {},
  ) {
    this._client = createEdgeOperator(credential, subscriptionId, options);
    this.pipeline = this._client.pipeline;
    this.systemReadinessOperations = _getSystemReadinessOperationsOperations(this._client);
    this.operations = _getOperationsOperations(this._client);
  }

  /** The operation groups for systemReadinessOperations */
  public readonly systemReadinessOperations: SystemReadinessOperationsOperations;
  /** The operation groups for operations */
  public readonly operations: OperationsOperations;
}
