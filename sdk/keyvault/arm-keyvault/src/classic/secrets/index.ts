// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { KeyVaultManagementContext } from "../../api/keyVaultManagementContext.js";
import { list, update, createOrUpdate, get } from "../../api/secrets/operations.js";
import type {
  SecretsListOptionalParams,
  SecretsUpdateOptionalParams,
  SecretsCreateOrUpdateOptionalParams,
  SecretsGetOptionalParams,
} from "../../api/secrets/options.js";
import type {
  Secret,
  SecretCreateOrUpdateParameters,
  SecretPatchParameters,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Secrets operations. */
export interface SecretsOperations {
  /** The List operation gets information about the secrets in a vault.  NOTE: This API is intended for internal use in ARM deployments. Users should use the data-plane REST service for interaction with vault secrets. */
  list: (
    resourceGroupName: string,
    vaultName: string,
    options?: SecretsListOptionalParams,
  ) => PagedAsyncIterableIterator<Secret>;
  /** Update a secret in the specified subscription.  NOTE: This API is intended for internal use in ARM deployments.  Users should use the data-plane REST service for interaction with vault secrets. */
  update: (
    resourceGroupName: string,
    vaultName: string,
    secretName: string,
    parameters: SecretPatchParameters,
    options?: SecretsUpdateOptionalParams,
  ) => Promise<Secret>;
  /** Create or update a secret in a key vault in the specified subscription.  NOTE: This API is intended for internal use in ARM deployments. Users should use the data-plane REST service for interaction with vault secrets. */
  createOrUpdate: (
    resourceGroupName: string,
    vaultName: string,
    secretName: string,
    parameters: SecretCreateOrUpdateParameters,
    options?: SecretsCreateOrUpdateOptionalParams,
  ) => Promise<Secret>;
  /** Gets the specified secret.  NOTE: This API is intended for internal use in ARM deployments. Users should use the data-plane REST service for interaction with vault secrets. */
  get: (
    resourceGroupName: string,
    vaultName: string,
    secretName: string,
    options?: SecretsGetOptionalParams,
  ) => Promise<Secret>;
}

function _getSecrets(context: KeyVaultManagementContext) {
  return {
    list: (resourceGroupName: string, vaultName: string, options?: SecretsListOptionalParams) =>
      list(context, resourceGroupName, vaultName, options),
    update: (
      resourceGroupName: string,
      vaultName: string,
      secretName: string,
      parameters: SecretPatchParameters,
      options?: SecretsUpdateOptionalParams,
    ) => update(context, resourceGroupName, vaultName, secretName, parameters, options),
    createOrUpdate: (
      resourceGroupName: string,
      vaultName: string,
      secretName: string,
      parameters: SecretCreateOrUpdateParameters,
      options?: SecretsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, vaultName, secretName, parameters, options),
    get: (
      resourceGroupName: string,
      vaultName: string,
      secretName: string,
      options?: SecretsGetOptionalParams,
    ) => get(context, resourceGroupName, vaultName, secretName, options),
  };
}

export function _getSecretsOperations(context: KeyVaultManagementContext): SecretsOperations {
  return {
    ..._getSecrets(context),
  };
}
