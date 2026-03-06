// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  createBatchManagement,
  BatchManagementContext,
  BatchManagementClientOptionalParams,
} from "./api/index.js";
import { ApplicationOperations, _getApplicationOperations } from "./classic/application/index.js";
import {
  ApplicationPackageOperations,
  _getApplicationPackageOperations,
} from "./classic/applicationPackage/index.js";
import {
  BatchAccountOperations,
  _getBatchAccountOperations,
} from "./classic/batchAccount/index.js";
import { LocationOperations, _getLocationOperations } from "./classic/location/index.js";
import {
  NetworkSecurityPerimeterOperations,
  _getNetworkSecurityPerimeterOperations,
} from "./classic/networkSecurityPerimeter/index.js";
import { OperationsOperations, _getOperationsOperations } from "./classic/operations/index.js";
import { PoolOperations, _getPoolOperations } from "./classic/pool/index.js";
import {
  PrivateEndpointConnectionOperations,
  _getPrivateEndpointConnectionOperations,
} from "./classic/privateEndpointConnection/index.js";
import {
  PrivateLinkResourceOperations,
  _getPrivateLinkResourceOperations,
} from "./classic/privateLinkResource/index.js";
import { TokenCredential } from "@azure/core-auth";
import { Pipeline } from "@azure/core-rest-pipeline";

export { BatchManagementClientOptionalParams } from "./api/batchManagementContext.js";

export class BatchManagementClient {
  private _client: BatchManagementContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  constructor(credential: TokenCredential, options?: BatchManagementClientOptionalParams);
  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options?: BatchManagementClientOptionalParams,
  );
  /** The Batch Management Client. */
  constructor(
    credential: TokenCredential,
    subscriptionIdOrOptions?: string | BatchManagementClientOptionalParams,
    options?: BatchManagementClientOptionalParams,
  ) {
    let subscriptionId: string | undefined;

    if (typeof subscriptionIdOrOptions === "string") {
      subscriptionId = subscriptionIdOrOptions;
    } else if (typeof subscriptionIdOrOptions === "object") {
      options = subscriptionIdOrOptions;
    }

    options = options ?? {};
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._client = createBatchManagement(credential, subscriptionId ?? "", {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.location = _getLocationOperations(this._client);
    this.networkSecurityPerimeter = _getNetworkSecurityPerimeterOperations(this._client);
    this.pool = _getPoolOperations(this._client);
    this.privateEndpointConnection = _getPrivateEndpointConnectionOperations(this._client);
    this.privateLinkResource = _getPrivateLinkResourceOperations(this._client);
    this.application = _getApplicationOperations(this._client);
    this.applicationPackage = _getApplicationPackageOperations(this._client);
    this.batchAccount = _getBatchAccountOperations(this._client);
    this.operations = _getOperationsOperations(this._client);
  }

  /** The operation groups for location */
  public readonly location: LocationOperations;
  /** The operation groups for networkSecurityPerimeter */
  public readonly networkSecurityPerimeter: NetworkSecurityPerimeterOperations;
  /** The operation groups for pool */
  public readonly pool: PoolOperations;
  /** The operation groups for privateEndpointConnection */
  public readonly privateEndpointConnection: PrivateEndpointConnectionOperations;
  /** The operation groups for privateLinkResource */
  public readonly privateLinkResource: PrivateLinkResourceOperations;
  /** The operation groups for application */
  public readonly application: ApplicationOperations;
  /** The operation groups for applicationPackage */
  public readonly applicationPackage: ApplicationPackageOperations;
  /** The operation groups for batchAccount */
  public readonly batchAccount: BatchAccountOperations;
  /** The operation groups for operations */
  public readonly operations: OperationsOperations;
}
