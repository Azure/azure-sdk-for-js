// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  PrivateLinkScopesContext,
  PrivateLinkScopesClientOptionalParams,
} from "./api/index.js";
import { createPrivateLinkScopes } from "./api/index.js";
import type { PrivateEndpointConnectionsOperations } from "./classic/privateEndpointConnections/index.js";
import { _getPrivateEndpointConnectionsOperations } from "./classic/privateEndpointConnections/index.js";
import type { PrivateLinkResourcesOperations } from "./classic/privateLinkResources/index.js";
import { _getPrivateLinkResourcesOperations } from "./classic/privateLinkResources/index.js";
import type { PrivateLinkScopesOperations } from "./classic/privateLinkScopes/index.js";
import { _getPrivateLinkScopesOperations } from "./classic/privateLinkScopes/index.js";
import type { TokenCredential } from "@azure/core-auth";
import type { Pipeline } from "@azure/core-rest-pipeline";

export type { PrivateLinkScopesClientOptionalParams } from "./api/privateLinkScopesContext.js";

export class PrivateLinkScopesClient {
  private _client: PrivateLinkScopesContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  /** Azure Arc K8s Clusters API reference for Private Link's Scopes management. */
  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options: PrivateLinkScopesClientOptionalParams = {},
  ) {
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._client = createPrivateLinkScopes(credential, subscriptionId, {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.privateLinkScopes = _getPrivateLinkScopesOperations(this._client);
    this.privateEndpointConnections = _getPrivateEndpointConnectionsOperations(this._client);
    this.privateLinkResources = _getPrivateLinkResourcesOperations(this._client);
  }

  /** The operation groups for privateLinkScopes */
  public readonly privateLinkScopes: PrivateLinkScopesOperations;
  /** The operation groups for privateEndpointConnections */
  public readonly privateEndpointConnections: PrivateEndpointConnectionsOperations;
  /** The operation groups for privateLinkResources */
  public readonly privateLinkResources: PrivateLinkResourcesOperations;
}
