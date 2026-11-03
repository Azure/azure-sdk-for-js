// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  AttestationManagementContext,
  AttestationManagementClientOptionalParams,
  createAttestationManagement,
} from "./api/index.js";
import {
  AttestationProvidersOperations,
  _getAttestationProvidersOperations,
} from "./classic/attestationProviders/index.js";
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

export type { AttestationManagementClientOptionalParams } from "./api/attestationManagementContext.js";

export class AttestationManagementClient {
  private _client: AttestationManagementContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  constructor(credential: TokenCredential, options?: AttestationManagementClientOptionalParams);
  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options?: AttestationManagementClientOptionalParams,
  );
  /** Various APIs for managing resources in attestation service. This primarily encompasses per-provider management. */
  constructor(
    credential: TokenCredential,
    subscriptionIdOrOptions?: string | AttestationManagementClientOptionalParams,
    options?: AttestationManagementClientOptionalParams,
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
    this._client = createAttestationManagement(credential, subscriptionId ?? "", {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.privateLinkResources = _getPrivateLinkResourcesOperations(this._client);
    this.privateEndpointConnections = _getPrivateEndpointConnectionsOperations(this._client);
    this.attestationProviders = _getAttestationProvidersOperations(this._client);
    this.operations = _getOperationsOperations(this._client);
  }

  /** The operation groups for privateLinkResources */
  public readonly privateLinkResources: PrivateLinkResourcesOperations;
  /** The operation groups for privateEndpointConnections */
  public readonly privateEndpointConnections: PrivateEndpointConnectionsOperations;
  /** The operation groups for attestationProviders */
  public readonly attestationProviders: AttestationProvidersOperations;
  /** The operation groups for operations */
  public readonly operations: OperationsOperations;
}
