// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  SignalRManagementContext,
  SignalRManagementClientOptionalParams,
} from "./api/index.js";
import { createSignalRManagement } from "./api/index.js";
import type { OperationsOperations } from "./classic/operations/index.js";
import { _getOperationsOperations } from "./classic/operations/index.js";
import type { SignalROperations } from "./classic/signalR/index.js";
import { _getSignalROperations } from "./classic/signalR/index.js";
import type { SignalRCustomCertificatesOperations } from "./classic/signalRCustomCertificates/index.js";
import { _getSignalRCustomCertificatesOperations } from "./classic/signalRCustomCertificates/index.js";
import type { SignalRCustomDomainsOperations } from "./classic/signalRCustomDomains/index.js";
import { _getSignalRCustomDomainsOperations } from "./classic/signalRCustomDomains/index.js";
import type { SignalRPrivateEndpointConnectionsOperations } from "./classic/signalRPrivateEndpointConnections/index.js";
import { _getSignalRPrivateEndpointConnectionsOperations } from "./classic/signalRPrivateEndpointConnections/index.js";
import type { SignalRPrivateLinkResourcesOperations } from "./classic/signalRPrivateLinkResources/index.js";
import { _getSignalRPrivateLinkResourcesOperations } from "./classic/signalRPrivateLinkResources/index.js";
import type { SignalRReplicaSharedPrivateLinkResourcesOperations } from "./classic/signalRReplicaSharedPrivateLinkResources/index.js";
import { _getSignalRReplicaSharedPrivateLinkResourcesOperations } from "./classic/signalRReplicaSharedPrivateLinkResources/index.js";
import type { SignalRReplicasOperations } from "./classic/signalRReplicas/index.js";
import { _getSignalRReplicasOperations } from "./classic/signalRReplicas/index.js";
import type { SignalRSharedPrivateLinkResourcesOperations } from "./classic/signalRSharedPrivateLinkResources/index.js";
import { _getSignalRSharedPrivateLinkResourcesOperations } from "./classic/signalRSharedPrivateLinkResources/index.js";
import type { UsagesOperations } from "./classic/usages/index.js";
import { _getUsagesOperations } from "./classic/usages/index.js";
import type { TokenCredential } from "@azure/core-auth";
import type { Pipeline } from "@azure/core-rest-pipeline";

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
