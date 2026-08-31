// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PowerPlatformContext, PowerPlatformClientOptionalParams } from "./api/index.js";
import { createPowerPlatform } from "./api/index.js";
import type { AccountsOperations } from "./classic/accounts/index.js";
import { _getAccountsOperations } from "./classic/accounts/index.js";
import type { EnterprisePoliciesOperations } from "./classic/enterprisePolicies/index.js";
import { _getEnterprisePoliciesOperations } from "./classic/enterprisePolicies/index.js";
import type { OperationsOperations } from "./classic/operations/index.js";
import { _getOperationsOperations } from "./classic/operations/index.js";
import type { PrivateEndpointConnectionsOperations } from "./classic/privateEndpointConnections/index.js";
import { _getPrivateEndpointConnectionsOperations } from "./classic/privateEndpointConnections/index.js";
import type { PrivateLinkResourcesOperations } from "./classic/privateLinkResources/index.js";
import { _getPrivateLinkResourcesOperations } from "./classic/privateLinkResources/index.js";
import type { TokenCredential } from "@azure/core-auth";
import type { Pipeline } from "@azure/core-rest-pipeline";

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
