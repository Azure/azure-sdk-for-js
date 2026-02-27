// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  ChaosManagementContext,
  ChaosManagementClientOptionalParams} from "./api/index.js";
import {
  createChaosManagement
} from "./api/index.js";
import type { TargetTypesOperations} from "./classic/targetTypes/index.js";
import { _getTargetTypesOperations } from "./classic/targetTypes/index.js";
import type { TargetsOperations} from "./classic/targets/index.js";
import { _getTargetsOperations } from "./classic/targets/index.js";
import type {
  OperationStatusesOperations} from "./classic/operationStatuses/index.js";
import {
  _getOperationStatusesOperations,
} from "./classic/operationStatuses/index.js";
import type { OperationsOperations} from "./classic/operations/index.js";
import { _getOperationsOperations } from "./classic/operations/index.js";
import type {
  CapabilityTypesOperations} from "./classic/capabilityTypes/index.js";
import {
  _getCapabilityTypesOperations,
} from "./classic/capabilityTypes/index.js";
import type {
  CapabilitiesOperations} from "./classic/capabilities/index.js";
import {
  _getCapabilitiesOperations,
} from "./classic/capabilities/index.js";
import type { ExperimentsOperations} from "./classic/experiments/index.js";
import { _getExperimentsOperations } from "./classic/experiments/index.js";
import type { Pipeline } from "@azure/core-rest-pipeline";
import type { TokenCredential } from "@azure/core-auth";

export type { ChaosManagementClientOptionalParams } from "./api/chaosManagementContext.js";

export class ChaosManagementClient {
  private _client: ChaosManagementContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options: ChaosManagementClientOptionalParams = {},
  ) {
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._client = createChaosManagement(credential, subscriptionId, {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.targetTypes = _getTargetTypesOperations(this._client);
    this.targets = _getTargetsOperations(this._client);
    this.operationStatuses = _getOperationStatusesOperations(this._client);
    this.operations = _getOperationsOperations(this._client);
    this.capabilityTypes = _getCapabilityTypesOperations(this._client);
    this.capabilities = _getCapabilitiesOperations(this._client);
    this.experiments = _getExperimentsOperations(this._client);
  }

  /** The operation groups for targetTypes */
  public readonly targetTypes: TargetTypesOperations;
  /** The operation groups for targets */
  public readonly targets: TargetsOperations;
  /** The operation groups for operationStatuses */
  public readonly operationStatuses: OperationStatusesOperations;
  /** The operation groups for operations */
  public readonly operations: OperationsOperations;
  /** The operation groups for capabilityTypes */
  public readonly capabilityTypes: CapabilityTypesOperations;
  /** The operation groups for capabilities */
  public readonly capabilities: CapabilitiesOperations;
  /** The operation groups for experiments */
  public readonly experiments: ExperimentsOperations;
}
