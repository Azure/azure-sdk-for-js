// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  _getBillingContainersOperations,
  BillingContainersOperations,
} from "./classic/billingContainers/index.js";
import {
  _getAssetEndpointProfilesOperations,
  AssetEndpointProfilesOperations,
} from "./classic/assetEndpointProfiles/index.js";
import { _getAssetsOperations, AssetsOperations } from "./classic/assets/index.js";
import {
  _getOperationStatusOperations,
  OperationStatusOperations,
} from "./classic/operationStatus/index.js";
import { _getOperationsOperations, OperationsOperations } from "./classic/operations/index.js";
import {
  createDeviceRegistryManagement,
  DeviceRegistryManagementContext,
  DeviceRegistryManagementClientOptionalParams,
} from "./api/index.js";
import { Pipeline } from "@azure/core-rest-pipeline";
import { TokenCredential } from "@azure/core-auth";

export { DeviceRegistryManagementClientOptionalParams } from "./api/deviceRegistryManagementContext.js";

export class DeviceRegistryManagementClient {
  private _client: DeviceRegistryManagementContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  /** Microsoft.DeviceRegistry Resource Provider management API. */
  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options: DeviceRegistryManagementClientOptionalParams = {},
  ) {
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._client = createDeviceRegistryManagement(credential, subscriptionId, {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.billingContainers = _getBillingContainersOperations(this._client);
    this.assetEndpointProfiles = _getAssetEndpointProfilesOperations(this._client);
    this.assets = _getAssetsOperations(this._client);
    this.operationStatus = _getOperationStatusOperations(this._client);
    this.operations = _getOperationsOperations(this._client);
  }

  /** The operation groups for billingContainers */
  public readonly billingContainers: BillingContainersOperations;
  /** The operation groups for assetEndpointProfiles */
  public readonly assetEndpointProfiles: AssetEndpointProfilesOperations;
  /** The operation groups for assets */
  public readonly assets: AssetsOperations;
  /** The operation groups for operationStatus */
  public readonly operationStatus: OperationStatusOperations;
  /** The operation groups for operations */
  public readonly operations: OperationsOperations;
}
