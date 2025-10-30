// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  StandbyPoolManagementContext,
  StandbyPoolManagementClientOptionalParams,
} from "./api/index.js";
import { createStandbyPoolManagement } from "./api/index.js";
import type { OperationsOperations } from "./classic/operations/index.js";
import { _getOperationsOperations } from "./classic/operations/index.js";
import type { StandbyContainerGroupPoolRuntimeViewsOperations } from "./classic/standbyContainerGroupPoolRuntimeViews/index.js";
import { _getStandbyContainerGroupPoolRuntimeViewsOperations } from "./classic/standbyContainerGroupPoolRuntimeViews/index.js";
import type { StandbyContainerGroupPoolsOperations } from "./classic/standbyContainerGroupPools/index.js";
import { _getStandbyContainerGroupPoolsOperations } from "./classic/standbyContainerGroupPools/index.js";
import type { StandbyVirtualMachinePoolRuntimeViewsOperations } from "./classic/standbyVirtualMachinePoolRuntimeViews/index.js";
import { _getStandbyVirtualMachinePoolRuntimeViewsOperations } from "./classic/standbyVirtualMachinePoolRuntimeViews/index.js";
import type { StandbyVirtualMachinePoolsTestingOperations } from "./classic/standbyVirtualMachinePoolsTesting/index.js";
import { _getStandbyVirtualMachinePoolsTestingOperations } from "./classic/standbyVirtualMachinePoolsTesting/index.js";
import type { StandbyVirtualMachinesOperations } from "./classic/standbyVirtualMachines/index.js";
import { _getStandbyVirtualMachinesOperations } from "./classic/standbyVirtualMachines/index.js";
import type { TokenCredential } from "@azure/core-auth";
import type { Pipeline } from "@azure/core-rest-pipeline";

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
    this.standbyVirtualMachinePoolsTesting = _getStandbyVirtualMachinePoolsTestingOperations(
      this._client,
    );
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
  /** The operation groups for standbyVirtualMachinePoolsTesting */
  public readonly standbyVirtualMachinePoolsTesting: StandbyVirtualMachinePoolsTestingOperations;
  /** The operation groups for operations */
  public readonly operations: OperationsOperations;
}
