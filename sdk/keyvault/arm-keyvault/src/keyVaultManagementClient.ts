// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  KeyVaultManagementContext,
  KeyVaultManagementClientOptionalParams,
} from "./api/index.js";
import { createKeyVaultManagement } from "./api/index.js";
import type { KeysOperations } from "./classic/keys/index.js";
import { _getKeysOperations } from "./classic/keys/index.js";
import type { ManagedHsmKeysOperations } from "./classic/managedHsmKeys/index.js";
import { _getManagedHsmKeysOperations } from "./classic/managedHsmKeys/index.js";
import type { ManagedHsmsOperations } from "./classic/managedHsms/index.js";
import { _getManagedHsmsOperations } from "./classic/managedHsms/index.js";
import type { MhsmPrivateEndpointConnectionsOperations } from "./classic/mhsmPrivateEndpointConnections/index.js";
import { _getMhsmPrivateEndpointConnectionsOperations } from "./classic/mhsmPrivateEndpointConnections/index.js";
import type { MhsmPrivateLinkResourcesOperations } from "./classic/mhsmPrivateLinkResources/index.js";
import { _getMhsmPrivateLinkResourcesOperations } from "./classic/mhsmPrivateLinkResources/index.js";
import type { MhsmRegionsOperations } from "./classic/mhsmRegions/index.js";
import { _getMhsmRegionsOperations } from "./classic/mhsmRegions/index.js";
import type { OperationsOperations } from "./classic/operations/index.js";
import { _getOperationsOperations } from "./classic/operations/index.js";
import type { PrivateEndpointConnectionsOperations } from "./classic/privateEndpointConnections/index.js";
import { _getPrivateEndpointConnectionsOperations } from "./classic/privateEndpointConnections/index.js";
import type { PrivateLinkResourcesOperations } from "./classic/privateLinkResources/index.js";
import { _getPrivateLinkResourcesOperations } from "./classic/privateLinkResources/index.js";
import type { SecretsOperations } from "./classic/secrets/index.js";
import { _getSecretsOperations } from "./classic/secrets/index.js";
import type { VaultsOperations } from "./classic/vaults/index.js";
import { _getVaultsOperations } from "./classic/vaults/index.js";
import type { TokenCredential } from "@azure/core-auth";
import type { Pipeline } from "@azure/core-rest-pipeline";

export { KeyVaultManagementClientOptionalParams } from "./api/keyVaultManagementContext.js";

export class KeyVaultManagementClient {
  private _client: KeyVaultManagementContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  /** The Azure management API provides a RESTful set of web services that interact with Azure Key Vault. */
  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options: KeyVaultManagementClientOptionalParams = {},
  ) {
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._client = createKeyVaultManagement(credential, subscriptionId, {
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
