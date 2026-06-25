// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  KeyVaultManagementContext,
  KeyVaultManagementClientOptionalParams,
  createKeyVaultManagement,
} from "./api/index.js";
import { KeysOperations, _getKeysOperations } from "./classic/keys/index.js";
import {
  ManagedHsmKeysOperations,
  _getManagedHsmKeysOperations,
} from "./classic/managedHsmKeys/index.js";
import { ManagedHsmsOperations, _getManagedHsmsOperations } from "./classic/managedHsms/index.js";
import {
  MhsmPrivateEndpointConnectionsOperations,
  _getMhsmPrivateEndpointConnectionsOperations,
} from "./classic/mhsmPrivateEndpointConnections/index.js";
import {
  MhsmPrivateLinkResourcesOperations,
  _getMhsmPrivateLinkResourcesOperations,
} from "./classic/mhsmPrivateLinkResources/index.js";
import { MhsmRegionsOperations, _getMhsmRegionsOperations } from "./classic/mhsmRegions/index.js";
import { OperationsOperations, _getOperationsOperations } from "./classic/operations/index.js";
import {
  PrivateEndpointConnectionsOperations,
  _getPrivateEndpointConnectionsOperations,
} from "./classic/privateEndpointConnections/index.js";
import {
  PrivateLinkResourcesOperations,
  _getPrivateLinkResourcesOperations,
} from "./classic/privateLinkResources/index.js";
import { SecretsOperations, _getSecretsOperations } from "./classic/secrets/index.js";
import { VaultsOperations, _getVaultsOperations } from "./classic/vaults/index.js";
import { TokenCredential } from "@azure/core-auth";
import { Pipeline } from "@azure/core-rest-pipeline";

export type { KeyVaultManagementClientOptionalParams } from "./api/keyVaultManagementContext.js";

export class KeyVaultManagementClient {
  private _client: KeyVaultManagementContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  constructor(credential: TokenCredential, options?: KeyVaultManagementClientOptionalParams);
  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options?: KeyVaultManagementClientOptionalParams,
  );
  /** The Azure management API provides a RESTful set of web services that interact with Azure Key Vault. */
  constructor(
    credential: TokenCredential,
    subscriptionIdOrOptions?: string | KeyVaultManagementClientOptionalParams,
    options?: KeyVaultManagementClientOptionalParams,
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
    this._client = createKeyVaultManagement(credential, subscriptionId ?? "", {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
    this.mhsmPrivateEndpointConnections = _getMhsmPrivateEndpointConnectionsOperations(
      this._client,
    );
    this.mhsmRegions = _getMhsmRegionsOperations(this._client);
    this.mhsmPrivateLinkResources = _getMhsmPrivateLinkResourcesOperations(this._client);
    this.privateLinkResources = _getPrivateLinkResourcesOperations(this._client);
    this.managedHsmKeys = _getManagedHsmKeysOperations(this._client);
    this.keys = _getKeysOperations(this._client);
    this.secrets = _getSecretsOperations(this._client);
    this.managedHsms = _getManagedHsmsOperations(this._client);
    this.privateEndpointConnections = _getPrivateEndpointConnectionsOperations(this._client);
    this.vaults = _getVaultsOperations(this._client);
    this.operations = _getOperationsOperations(this._client);
  }

  /** The operation groups for mhsmPrivateEndpointConnections */
  public readonly mhsmPrivateEndpointConnections: MhsmPrivateEndpointConnectionsOperations;
  /** The operation groups for mhsmRegions */
  public readonly mhsmRegions: MhsmRegionsOperations;
  /** The operation groups for mhsmPrivateLinkResources */
  public readonly mhsmPrivateLinkResources: MhsmPrivateLinkResourcesOperations;
  /** The operation groups for privateLinkResources */
  public readonly privateLinkResources: PrivateLinkResourcesOperations;
  /** The operation groups for managedHsmKeys */
  public readonly managedHsmKeys: ManagedHsmKeysOperations;
  /** The operation groups for keys */
  public readonly keys: KeysOperations;
  /** The operation groups for secrets */
  public readonly secrets: SecretsOperations;
  /** The operation groups for managedHsms */
  public readonly managedHsms: ManagedHsmsOperations;
  /** The operation groups for privateEndpointConnections */
  public readonly privateEndpointConnections: PrivateEndpointConnectionsOperations;
  /** The operation groups for vaults */
  public readonly vaults: VaultsOperations;
  /** The operation groups for operations */
  public readonly operations: OperationsOperations;
}
