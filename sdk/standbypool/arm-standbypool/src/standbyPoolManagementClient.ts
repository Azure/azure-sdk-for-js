// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  createStandbyPoolManagement,
  StandbyPoolManagementContext,
  StandbyPoolManagementClientOptionalParams,
} from "./api/index.js";
import {
  StandbyContainerGroupPoolRuntimeViewsOperations,
  _getStandbyContainerGroupPoolRuntimeViewsOperations,
} from "./classic/standbyContainerGroupPoolRuntimeViews/index.js";
import {
  StandbyContainerGroupPoolsOperations,
  _getStandbyContainerGroupPoolsOperations,
} from "./classic/standbyContainerGroupPools/index.js";
import {
  StandbyVirtualMachinePoolRuntimeViewsOperations,
  _getStandbyVirtualMachinePoolRuntimeViewsOperations,
} from "./classic/standbyVirtualMachinePoolRuntimeViews/index.js";
import {
  StandbyVirtualMachinesOperations,
  _getStandbyVirtualMachinesOperations,
} from "./classic/standbyVirtualMachines/index.js";
import {
  StandbyVirtualMachinePoolsOperations,
  _getStandbyVirtualMachinePoolsOperations,
} from "./classic/standbyVirtualMachinePools/index.js";
import { OperationsOperations, _getOperationsOperations } from "./classic/operations/index.js";
import { Pipeline } from "@azure/core-rest-pipeline";
import { TokenCredential } from "@azure/core-auth";

export { StandbyPoolManagementClientOptionalParams } from "./api/standbyPoolManagementContext.js";

export class StandbyPoolManagementClient {
  private _client: StandbyPoolManagementContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options: StandbyPoolManagementClientOptionalParams = {},
  ) {
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._client = createStandbyPoolManagement(credential, subscriptionId, {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.standbyContainerGroupPoolRuntimeViews =
      _getStandbyContainerGroupPoolRuntimeViewsOperations(this._client);
    this.standbyContainerGroupPools = _getStandbyContainerGroupPoolsOperations(this._client);
    this.standbyVirtualMachinePoolRuntimeViews =
      _getStandbyVirtualMachinePoolRuntimeViewsOperations(this._client);
    this.standbyVirtualMachines = _getStandbyVirtualMachinesOperations(this._client);
    this.standbyVirtualMachinePools = _getStandbyVirtualMachinePoolsOperations(this._client);
    this.operations = _getOperationsOperations(this._client);
  }

  /** The operation groups for standbyContainerGroupPoolRuntimeViews */
  public readonly standbyContainerGroupPoolRuntimeViews: StandbyContainerGroupPoolRuntimeViewsOperations;
  /** The operation groups for standbyContainerGroupPools */
  public readonly standbyContainerGroupPools: StandbyContainerGroupPoolsOperations;
  /** The operation groups for standbyVirtualMachinePoolRuntimeViews */
  public readonly standbyVirtualMachinePoolRuntimeViews: StandbyVirtualMachinePoolRuntimeViewsOperations;
  /** The operation groups for standbyVirtualMachines */
  public readonly standbyVirtualMachines: StandbyVirtualMachinesOperations;
  /** The operation groups for standbyVirtualMachinePools */
  public readonly standbyVirtualMachinePools: StandbyVirtualMachinePoolsOperations;
  /** The operation groups for operations */
  public readonly operations: OperationsOperations;
}
