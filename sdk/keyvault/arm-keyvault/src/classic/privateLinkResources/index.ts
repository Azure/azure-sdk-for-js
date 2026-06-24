// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { KeyVaultManagementContext } from "../../api/keyVaultManagementContext.js";
import { listByVault } from "../../api/privateLinkResources/operations.js";
import { PrivateLinkResourcesListByVaultOptionalParams } from "../../api/privateLinkResources/options.js";
import { PrivateLinkResourceListResult } from "../../models/models.js";

/** Interface representing a PrivateLinkResources operations. */
export interface PrivateLinkResourcesOperations {
  /** Gets the private link resources supported for the key vault. */
  listByVault: (
    resourceGroupName: string,
    vaultName: string,
    options?: PrivateLinkResourcesListByVaultOptionalParams,
  ) => Promise<PrivateLinkResourceListResult>;
}

function _getPrivateLinkResources(context: KeyVaultManagementContext) {
  return {
    listByVault: (
      resourceGroupName: string,
      vaultName: string,
      options?: PrivateLinkResourcesListByVaultOptionalParams,
    ) => listByVault(context, resourceGroupName, vaultName, options),
  };
}

export function _getPrivateLinkResourcesOperations(
  context: KeyVaultManagementContext,
): PrivateLinkResourcesOperations {
  return {
    ..._getPrivateLinkResources(context),
  };
}
