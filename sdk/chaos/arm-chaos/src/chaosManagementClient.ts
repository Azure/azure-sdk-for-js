// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  createChaosManagement,
  ChaosManagementContext,
  ChaosManagementClientOptionalParams,
} from "./api/index.js";
import {
  OperationStatusesOperations,
  _getOperationStatusesOperations,
} from "./classic/operationStatuses/index.js";
import { TargetTypesOperations, _getTargetTypesOperations } from "./classic/targetTypes/index.js";
import {
  ExperimentExecutionsOperations,
  _getExperimentExecutionsOperations,
} from "./classic/experimentExecutions/index.js";
import { ExperimentsOperations, _getExperimentsOperations } from "./classic/experiments/index.js";
import {
  CapabilityTypesOperations,
  _getCapabilityTypesOperations,
} from "./classic/capabilityTypes/index.js";
import { TargetsOperations, _getTargetsOperations } from "./classic/targets/index.js";
import { OperationsOperations, _getOperationsOperations } from "./classic/operations/index.js";
import {
  CapabilitiesOperations,
  _getCapabilitiesOperations,
} from "./classic/capabilities/index.js";
import { Pipeline } from "@azure/core-rest-pipeline";
import { TokenCredential } from "@azure/core-auth";

export { ChaosManagementClientOptionalParams } from "./api/chaosManagementContext.js";

export class ChaosManagementClient {
  private _client: ChaosManagementContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  /** Chaos Management Client */
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
    this.operationStatuses = _getOperationStatusesOperations(this._client);
    this.targetTypes = _getTargetTypesOperations(this._client);
    this.experimentExecutions = _getExperimentExecutionsOperations(this._client);
    this.experiments = _getExperimentsOperations(this._client);
    this.capabilityTypes = _getCapabilityTypesOperations(this._client);
    this.targets = _getTargetsOperations(this._client);
    this.operations = _getOperationsOperations(this._client);
    this.capabilities = _getCapabilitiesOperations(this._client);
  }

  /** The operation groups for operationStatuses */
  public readonly operationStatuses: OperationStatusesOperations;
  /** The operation groups for targetTypes */
  public readonly targetTypes: TargetTypesOperations;
  /** The operation groups for experimentExecutions */
  public readonly experimentExecutions: ExperimentExecutionsOperations;
  /** The operation groups for experiments */
  public readonly experiments: ExperimentsOperations;
  /** The operation groups for capabilityTypes */
  public readonly capabilityTypes: CapabilityTypesOperations;
  /** The operation groups for targets */
  public readonly targets: TargetsOperations;
  /** The operation groups for operations */
  public readonly operations: OperationsOperations;
  /** The operation groups for capabilities */
  public readonly capabilities: CapabilitiesOperations;
}
