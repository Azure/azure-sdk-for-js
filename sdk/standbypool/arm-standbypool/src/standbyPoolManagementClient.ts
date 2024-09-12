// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { TokenCredential } from "@azure/core-auth";
import { Pipeline } from "@azure/core-rest-pipeline";
import {
  getOperationsOperations,
  OperationsOperations,
} from "./classic/operations/index.js";
import {
  getStandbyVirtualMachinePoolsOperations,
  StandbyVirtualMachinePoolsOperations,
} from "./classic/standbyVirtualMachinePools/index.js";
import {
  getStandbyVirtualMachinesOperations,
  StandbyVirtualMachinesOperations,
} from "./classic/standbyVirtualMachines/index.js";
import {
  getStandbyVirtualMachinePoolRuntimeViewsOperations,
  StandbyVirtualMachinePoolRuntimeViewsOperations,
} from "./classic/standbyVirtualMachinePoolRuntimeViews/index.js";
import {
  getStandbyContainerGroupPoolsOperations,
  StandbyContainerGroupPoolsOperations,
} from "./classic/standbyContainerGroupPools/index.js";
import {
  getStandbyContainerGroupPoolRuntimeViewsOperations,
  StandbyContainerGroupPoolRuntimeViewsOperations,
} from "./classic/standbyContainerGroupPoolRuntimeViews/index.js";
import {
  createStandbyPoolManagement,
  StandbyPoolContext,
  StandbyPoolManagementClientOptionalParams,
} from "./api/index.js";

export { StandbyPoolManagementClientOptionalParams } from "./api/standbyPoolManagementContext.js";

export class StandbyPoolManagementClient {
  private _client: StandbyPoolContext;
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
      : "azsdk-js-client";
    this._client = createStandbyPoolManagement(credential, {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.operations = getOperationsOperations(this._client);
    this.standbyVirtualMachinePools = getStandbyVirtualMachinePoolsOperations(
      this._client,
      subscriptionId,
    );
    this.standbyVirtualMachines = getStandbyVirtualMachinesOperations(
      this._client,
      subscriptionId,
    );
    this.standbyVirtualMachinePoolRuntimeViews =
      getStandbyVirtualMachinePoolRuntimeViewsOperations(
        this._client,
        subscriptionId,
      );
    this.standbyContainerGroupPools = getStandbyContainerGroupPoolsOperations(
      this._client,
      subscriptionId,
    );
    this.standbyContainerGroupPoolRuntimeViews =
      getStandbyContainerGroupPoolRuntimeViewsOperations(
        this._client,
        subscriptionId,
      );
  }

  /** The operation groups for Operations */
  public readonly operations: OperationsOperations;
  /** The operation groups for StandbyVirtualMachinePools */
  public readonly standbyVirtualMachinePools: StandbyVirtualMachinePoolsOperations;
  /** The operation groups for StandbyVirtualMachines */
  public readonly standbyVirtualMachines: StandbyVirtualMachinesOperations;
  /** The operation groups for StandbyVirtualMachinePoolRuntimeViews */
  public readonly standbyVirtualMachinePoolRuntimeViews: StandbyVirtualMachinePoolRuntimeViewsOperations;
  /** The operation groups for StandbyContainerGroupPools */
  public readonly standbyContainerGroupPools: StandbyContainerGroupPoolsOperations;
  /** The operation groups for StandbyContainerGroupPoolRuntimeViews */
  public readonly standbyContainerGroupPoolRuntimeViews: StandbyContainerGroupPoolRuntimeViewsOperations;
}
