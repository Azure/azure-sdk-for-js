// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  WebPubSubManagementContext,
  WebPubSubManagementClientOptionalParams,
  createWebPubSubManagement,
} from "./api/index.js";
import { OperationsOperations, _getOperationsOperations } from "./classic/operations/index.js";
import { UsagesOperations, _getUsagesOperations } from "./classic/usages/index.js";
import { WebPubSubOperations, _getWebPubSubOperations } from "./classic/webPubSub/index.js";
import {
  WebPubSubCustomCertificatesOperations,
  _getWebPubSubCustomCertificatesOperations,
} from "./classic/webPubSubCustomCertificates/index.js";
import {
  WebPubSubCustomDomainsOperations,
  _getWebPubSubCustomDomainsOperations,
} from "./classic/webPubSubCustomDomains/index.js";
import {
  WebPubSubHubsOperations,
  _getWebPubSubHubsOperations,
} from "./classic/webPubSubHubs/index.js";
import {
  WebPubSubPrivateEndpointConnectionsOperations,
  _getWebPubSubPrivateEndpointConnectionsOperations,
} from "./classic/webPubSubPrivateEndpointConnections/index.js";
import {
  WebPubSubPrivateLinkResourcesOperations,
  _getWebPubSubPrivateLinkResourcesOperations,
} from "./classic/webPubSubPrivateLinkResources/index.js";
import {
  WebPubSubReplicaSharedPrivateLinkResourcesOperations,
  _getWebPubSubReplicaSharedPrivateLinkResourcesOperations,
} from "./classic/webPubSubReplicaSharedPrivateLinkResources/index.js";
import {
  WebPubSubReplicasOperations,
  _getWebPubSubReplicasOperations,
} from "./classic/webPubSubReplicas/index.js";
import {
  WebPubSubSharedPrivateLinkResourcesOperations,
  _getWebPubSubSharedPrivateLinkResourcesOperations,
} from "./classic/webPubSubSharedPrivateLinkResources/index.js";
import { TokenCredential } from "@azure/core-auth";
import { Pipeline } from "@azure/core-rest-pipeline";

export type { WebPubSubManagementClientOptionalParams } from "./api/webPubSubManagementContext.js";

export class WebPubSubManagementClient {
  private _client: WebPubSubManagementContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  constructor(credential: TokenCredential, options?: WebPubSubManagementClientOptionalParams);
  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options?: WebPubSubManagementClientOptionalParams,
  );
  /** REST API for Azure WebPubSub Service */
  constructor(
    credential: TokenCredential,
    subscriptionIdOrOptions?: string | WebPubSubManagementClientOptionalParams,
    options?: WebPubSubManagementClientOptionalParams,
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
    this._client = createWebPubSubManagement(credential, subscriptionId ?? "", {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.usages = _getUsagesOperations(this._client);
    this.webPubSubReplicaSharedPrivateLinkResources =
      _getWebPubSubReplicaSharedPrivateLinkResourcesOperations(this._client);
    this.webPubSubReplicas = _getWebPubSubReplicasOperations(this._client);
    this.webPubSubPrivateEndpointConnections = _getWebPubSubPrivateEndpointConnectionsOperations(
      this._client,
    );
    this.webPubSubCustomDomains = _getWebPubSubCustomDomainsOperations(this._client);
    this.webPubSubCustomCertificates = _getWebPubSubCustomCertificatesOperations(this._client);
    this.webPubSubPrivateLinkResources = _getWebPubSubPrivateLinkResourcesOperations(this._client);
    this.webPubSub = _getWebPubSubOperations(this._client);
    this.webPubSubSharedPrivateLinkResources = _getWebPubSubSharedPrivateLinkResourcesOperations(
      this._client,
    );
    this.webPubSubHubs = _getWebPubSubHubsOperations(this._client);
    this.operations = _getOperationsOperations(this._client);
  }

  /** The operation groups for usages */
  public readonly usages: UsagesOperations;
  /** The operation groups for webPubSubReplicaSharedPrivateLinkResources */
  public readonly webPubSubReplicaSharedPrivateLinkResources: WebPubSubReplicaSharedPrivateLinkResourcesOperations;
  /** The operation groups for webPubSubReplicas */
  public readonly webPubSubReplicas: WebPubSubReplicasOperations;
  /** The operation groups for webPubSubPrivateEndpointConnections */
  public readonly webPubSubPrivateEndpointConnections: WebPubSubPrivateEndpointConnectionsOperations;
  /** The operation groups for webPubSubCustomDomains */
  public readonly webPubSubCustomDomains: WebPubSubCustomDomainsOperations;
  /** The operation groups for webPubSubCustomCertificates */
  public readonly webPubSubCustomCertificates: WebPubSubCustomCertificatesOperations;
  /** The operation groups for webPubSubPrivateLinkResources */
  public readonly webPubSubPrivateLinkResources: WebPubSubPrivateLinkResourcesOperations;
  /** The operation groups for webPubSub */
  public readonly webPubSub: WebPubSubOperations;
  /** The operation groups for webPubSubSharedPrivateLinkResources */
  public readonly webPubSubSharedPrivateLinkResources: WebPubSubSharedPrivateLinkResourcesOperations;
  /** The operation groups for webPubSubHubs */
  public readonly webPubSubHubs: WebPubSubHubsOperations;
  /** The operation groups for operations */
  public readonly operations: OperationsOperations;
}
