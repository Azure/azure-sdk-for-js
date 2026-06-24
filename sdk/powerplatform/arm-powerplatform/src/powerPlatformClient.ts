// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  PowerPlatformContext,
  PowerPlatformClientOptionalParams,
  createPowerPlatform,
} from "./api/index.js";
import { AccountsOperations, _getAccountsOperations } from "./classic/accounts/index.js";
import {
  EnterprisePoliciesOperations,
  _getEnterprisePoliciesOperations,
} from "./classic/enterprisePolicies/index.js";
import { OperationsOperations, _getOperationsOperations } from "./classic/operations/index.js";
import {
  PrivateEndpointConnectionsOperations,
  _getPrivateEndpointConnectionsOperations,
} from "./classic/privateEndpointConnections/index.js";
import {
  PrivateLinkResourcesOperations,
  _getPrivateLinkResourcesOperations,
} from "./classic/privateLinkResources/index.js";
import { TokenCredential } from "@azure/core-auth";
import { Pipeline } from "@azure/core-rest-pipeline";

export type { PowerPlatformClientOptionalParams } from "./api/powerPlatformContext.js";

export class PowerPlatformClient {
  private _client: PowerPlatformContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  /** // (missing-service-description) Add service description */
  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options: PowerPlatformClientOptionalParams = {},
  ) {
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._client = createPowerPlatform(credential, subscriptionId, {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.privateLinkResources = _getPrivateLinkResourcesOperations(this._client);
    this.privateEndpointConnections = _getPrivateEndpointConnectionsOperations(this._client);
    this.enterprisePolicies = _getEnterprisePoliciesOperations(this._client);
    this.accounts = _getAccountsOperations(this._client);
    this.operations = _getOperationsOperations(this._client);
  }

  /** The operation groups for privateLinkResources */
  public readonly privateLinkResources: PrivateLinkResourcesOperations;
  /** The operation groups for privateEndpointConnections */
  public readonly privateEndpointConnections: PrivateEndpointConnectionsOperations;
  /** The operation groups for enterprisePolicies */
  public readonly enterprisePolicies: EnterprisePoliciesOperations;
  /** The operation groups for accounts */
  public readonly accounts: AccountsOperations;
  /** The operation groups for operations */
  public readonly operations: OperationsOperations;
}
