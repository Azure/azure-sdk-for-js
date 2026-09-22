// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  AzureMapsManagementContext,
  AzureMapsManagementClientOptionalParams,
} from "./api/index.js";
import { createAzureMapsManagement } from "./api/index.js";
import type { AccountsOperations } from "./classic/accounts/index.js";
import { _getAccountsOperations } from "./classic/accounts/index.js";
import type { CreatorsOperations } from "./classic/creators/index.js";
import { _getCreatorsOperations } from "./classic/creators/index.js";
import type { MapsOperations } from "./classic/maps/index.js";
import { _getMapsOperations } from "./classic/maps/index.js";
import type { OperationResultOperations } from "./classic/operationResult/index.js";
import { _getOperationResultOperations } from "./classic/operationResult/index.js";
import type { OperationStatusOperations } from "./classic/operationStatus/index.js";
import { _getOperationStatusOperations } from "./classic/operationStatus/index.js";
import type { PrivateEndpointConnectionsOperations } from "./classic/privateEndpointConnections/index.js";
import { _getPrivateEndpointConnectionsOperations } from "./classic/privateEndpointConnections/index.js";
import type { PrivateLinkResourcesOperations } from "./classic/privateLinkResources/index.js";
import { _getPrivateLinkResourcesOperations } from "./classic/privateLinkResources/index.js";
import type { TokenCredential } from "@azure/core-auth";
import type { Pipeline } from "@azure/core-rest-pipeline";

export type { AzureMapsManagementClientOptionalParams } from "./api/azureMapsManagementContext.js";

export class AzureMapsManagementClient {
  private _client: AzureMapsManagementContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  /** Resource Provider */
  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options: AzureMapsManagementClientOptionalParams = {},
  ) {
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._client = createAzureMapsManagement(credential, subscriptionId, {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.operationStatus = _getOperationStatusOperations(this._client);
    this.operationResult = _getOperationResultOperations(this._client);
    this.maps = _getMapsOperations(this._client);
    this.privateEndpointConnections = _getPrivateEndpointConnectionsOperations(this._client);
    this.privateLinkResources = _getPrivateLinkResourcesOperations(this._client);
    this.creators = _getCreatorsOperations(this._client);
    this.accounts = _getAccountsOperations(this._client);
  }

  /** The operation groups for operationStatus */
  public readonly operationStatus: OperationStatusOperations;
  /** The operation groups for operationResult */
  public readonly operationResult: OperationResultOperations;
  /** The operation groups for maps */
  public readonly maps: MapsOperations;
  /** The operation groups for privateEndpointConnections */
  public readonly privateEndpointConnections: PrivateEndpointConnectionsOperations;
  /** The operation groups for privateLinkResources */
  public readonly privateLinkResources: PrivateLinkResourcesOperations;
  /** The operation groups for creators */
  public readonly creators: CreatorsOperations;
  /** The operation groups for accounts */
  public readonly accounts: AccountsOperations;
}
