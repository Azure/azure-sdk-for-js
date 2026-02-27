// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  CarbonOptimizationManagementContext,
  CarbonOptimizationManagementClientOptionalParams} from "./api/index.js";
import {
  createCarbonOptimizationManagement
} from "./api/index.js";
import type {
  CarbonServiceOperations} from "./classic/carbonService/index.js";
import {
  _getCarbonServiceOperations,
} from "./classic/carbonService/index.js";
import type { OperationsOperations} from "./classic/operations/index.js";
import { _getOperationsOperations } from "./classic/operations/index.js";
import type { Pipeline } from "@azure/core-rest-pipeline";
import type { TokenCredential } from "@azure/core-auth";

export type { CarbonOptimizationManagementClientOptionalParams } from "./api/carbonOptimizationManagementContext.js";

export class CarbonOptimizationManagementClient {
  private _client: CarbonOptimizationManagementContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  /** Carbon Report Resource Provider query API. */
  constructor(
    credential: TokenCredential,
    options: CarbonOptimizationManagementClientOptionalParams = {},
  ) {
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._client = createCarbonOptimizationManagement(credential, {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.carbonService = _getCarbonServiceOperations(this._client);
    this.operations = _getOperationsOperations(this._client);
  }

  /** The operation groups for carbonService */
  public readonly carbonService: CarbonServiceOperations;
  /** The operation groups for operations */
  public readonly operations: OperationsOperations;
}
