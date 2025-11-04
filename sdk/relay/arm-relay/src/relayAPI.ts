// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RelayAPIContext, RelayAPIOptionalParams } from "./api/index.js";
import { createRelayAPI } from "./api/index.js";
import type { HybridConnectionsOperations } from "./classic/hybridConnections/index.js";
import { _getHybridConnectionsOperations } from "./classic/hybridConnections/index.js";
import type { NamespacesOperations } from "./classic/namespaces/index.js";
import { _getNamespacesOperations } from "./classic/namespaces/index.js";
import type { OperationsOperations } from "./classic/operations/index.js";
import { _getOperationsOperations } from "./classic/operations/index.js";
import type { PrivateEndpointConnectionsOperations } from "./classic/privateEndpointConnections/index.js";
import { _getPrivateEndpointConnectionsOperations } from "./classic/privateEndpointConnections/index.js";
import type { PrivateLinkResourcesOperations } from "./classic/privateLinkResources/index.js";
import { _getPrivateLinkResourcesOperations } from "./classic/privateLinkResources/index.js";
import type { WCFRelaysOperations } from "./classic/wcfRelays/index.js";
import { _getWCFRelaysOperations } from "./classic/wcfRelays/index.js";
import type { TokenCredential } from "@azure/core-auth";
import type { Pipeline } from "@azure/core-rest-pipeline";

export { RelayAPIOptionalParams } from "./api/relayAPIContext.js";

export class RelayAPI {
  private _client: RelayAPIContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  /** Use these API to manage Azure Relay resources through Azure Resource Manager. */
  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options: RelayAPIOptionalParams = {},
  ) {
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._client = createRelayAPI(credential, subscriptionId, {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.namespaces = _getNamespacesOperations(this._client);
    this.privateLinkResources = _getPrivateLinkResourcesOperations(this._client);
    this.privateEndpointConnections = _getPrivateEndpointConnectionsOperations(this._client);
    this.wcfRelays = _getWCFRelaysOperations(this._client);
    this.hybridConnections = _getHybridConnectionsOperations(this._client);
    this.operations = _getOperationsOperations(this._client);
  }

  /** The operation groups for namespaces */
  public readonly namespaces: NamespacesOperations;
  /** The operation groups for privateLinkResources */
  public readonly privateLinkResources: PrivateLinkResourcesOperations;
  /** The operation groups for privateEndpointConnections */
  public readonly privateEndpointConnections: PrivateEndpointConnectionsOperations;
  /** The operation groups for wcfRelays */
  public readonly wcfRelays: WCFRelaysOperations;
  /** The operation groups for hybridConnections */
  public readonly hybridConnections: HybridConnectionsOperations;
  /** The operation groups for operations */
  public readonly operations: OperationsOperations;
}
