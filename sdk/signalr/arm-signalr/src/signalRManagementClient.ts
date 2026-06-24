// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  SignalRManagementContext,
  SignalRManagementClientOptionalParams,
  createSignalRManagement,
} from "./api/index.js";
import { OperationsOperations, _getOperationsOperations } from "./classic/operations/index.js";
import { SignalROperations, _getSignalROperations } from "./classic/signalR/index.js";
import {
  SignalRCustomCertificatesOperations,
  _getSignalRCustomCertificatesOperations,
} from "./classic/signalRCustomCertificates/index.js";
import {
  SignalRCustomDomainsOperations,
  _getSignalRCustomDomainsOperations,
} from "./classic/signalRCustomDomains/index.js";
import {
  SignalRPrivateEndpointConnectionsOperations,
  _getSignalRPrivateEndpointConnectionsOperations,
} from "./classic/signalRPrivateEndpointConnections/index.js";
import {
  SignalRPrivateLinkResourcesOperations,
  _getSignalRPrivateLinkResourcesOperations,
} from "./classic/signalRPrivateLinkResources/index.js";
import {
  SignalRReplicaSharedPrivateLinkResourcesOperations,
  _getSignalRReplicaSharedPrivateLinkResourcesOperations,
} from "./classic/signalRReplicaSharedPrivateLinkResources/index.js";
import {
  SignalRReplicasOperations,
  _getSignalRReplicasOperations,
} from "./classic/signalRReplicas/index.js";
import {
  SignalRSharedPrivateLinkResourcesOperations,
  _getSignalRSharedPrivateLinkResourcesOperations,
} from "./classic/signalRSharedPrivateLinkResources/index.js";
import { UsagesOperations, _getUsagesOperations } from "./classic/usages/index.js";
import { TokenCredential } from "@azure/core-auth";
import { Pipeline } from "@azure/core-rest-pipeline";

export type { SignalRManagementClientOptionalParams } from "./api/signalRManagementContext.js";

export class SignalRManagementClient {
  private _client: SignalRManagementContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  constructor(credential: TokenCredential, options?: SignalRManagementClientOptionalParams);
  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options?: SignalRManagementClientOptionalParams,
  );
  /** REST API for Azure SignalR Service */
  constructor(
    credential: TokenCredential,
    subscriptionIdOrOptions?: string | SignalRManagementClientOptionalParams,
    options?: SignalRManagementClientOptionalParams,
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
    this._client = createSignalRManagement(credential, subscriptionId ?? "", {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.usages = _getUsagesOperations(this._client);
    this.signalRReplicaSharedPrivateLinkResources =
      _getSignalRReplicaSharedPrivateLinkResourcesOperations(this._client);
    this.signalRReplicas = _getSignalRReplicasOperations(this._client);
    this.signalRPrivateEndpointConnections = _getSignalRPrivateEndpointConnectionsOperations(
      this._client,
    );
    this.signalRCustomDomains = _getSignalRCustomDomainsOperations(this._client);
    this.signalRCustomCertificates = _getSignalRCustomCertificatesOperations(this._client);
    this.signalRPrivateLinkResources = _getSignalRPrivateLinkResourcesOperations(this._client);
    this.signalR = _getSignalROperations(this._client);
    this.signalRSharedPrivateLinkResources = _getSignalRSharedPrivateLinkResourcesOperations(
      this._client,
    );
    this.operations = _getOperationsOperations(this._client);
  }

  /** The operation groups for usages */
  public readonly usages: UsagesOperations;
  /** The operation groups for signalRReplicaSharedPrivateLinkResources */
  public readonly signalRReplicaSharedPrivateLinkResources: SignalRReplicaSharedPrivateLinkResourcesOperations;
  /** The operation groups for signalRReplicas */
  public readonly signalRReplicas: SignalRReplicasOperations;
  /** The operation groups for signalRPrivateEndpointConnections */
  public readonly signalRPrivateEndpointConnections: SignalRPrivateEndpointConnectionsOperations;
  /** The operation groups for signalRCustomDomains */
  public readonly signalRCustomDomains: SignalRCustomDomainsOperations;
  /** The operation groups for signalRCustomCertificates */
  public readonly signalRCustomCertificates: SignalRCustomCertificatesOperations;
  /** The operation groups for signalRPrivateLinkResources */
  public readonly signalRPrivateLinkResources: SignalRPrivateLinkResourcesOperations;
  /** The operation groups for signalR */
  public readonly signalR: SignalROperations;
  /** The operation groups for signalRSharedPrivateLinkResources */
  public readonly signalRSharedPrivateLinkResources: SignalRSharedPrivateLinkResourcesOperations;
  /** The operation groups for operations */
  public readonly operations: OperationsOperations;
}
