// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  SecretsStoreExtensionManagementContext,
  SecretsStoreExtensionManagementClientOptionalParams,
} from "./api/index.js";
import { createSecretsStoreExtensionManagement } from "./api/index.js";
import type { AzureKeyVaultSecretProviderClassesOperations } from "./classic/azureKeyVaultSecretProviderClasses/index.js";
import { _getAzureKeyVaultSecretProviderClassesOperations } from "./classic/azureKeyVaultSecretProviderClasses/index.js";
import type { OperationsOperations } from "./classic/operations/index.js";
import { _getOperationsOperations } from "./classic/operations/index.js";
import type { SecretSyncsOperations } from "./classic/secretSyncs/index.js";
import { _getSecretSyncsOperations } from "./classic/secretSyncs/index.js";
import type { TokenCredential } from "@azure/core-auth";
import type { Pipeline } from "@azure/core-rest-pipeline";

export type { SecretsStoreExtensionManagementClientOptionalParams } from "./api/secretsStoreExtensionManagementContext.js";

export class SecretsStoreExtensionManagementClient {
  private _client: SecretsStoreExtensionManagementContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  /** Microsoft.SecretSyncController resource provider. */
  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options: SecretsStoreExtensionManagementClientOptionalParams = {},
  ) {
    this._client = createSecretsStoreExtensionManagement(credential, subscriptionId, options);
    this.pipeline = this._client.pipeline;
    this.secretSyncs = _getSecretSyncsOperations(this._client);
    this.azureKeyVaultSecretProviderClasses = _getAzureKeyVaultSecretProviderClassesOperations(
      this._client,
    );
    this.operations = _getOperationsOperations(this._client);
  }

  /** The operation groups for secretSyncs */
  public readonly secretSyncs: SecretSyncsOperations;
  /** The operation groups for azureKeyVaultSecretProviderClasses */
  public readonly azureKeyVaultSecretProviderClasses: AzureKeyVaultSecretProviderClassesOperations;
  /** The operation groups for operations */
  public readonly operations: OperationsOperations;
}
