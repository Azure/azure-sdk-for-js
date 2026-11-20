// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DataProtectionContext } from "../../api/dataProtectionContext.js";
import {
  remove,
  list,
  createOrUpdate,
  get,
} from "../../api/dppCrossTenantVaultMappings/operations.js";
import type {
  DppCrossTenantVaultMappingsRemoveOptionalParams,
  DppCrossTenantVaultMappingsListOptionalParams,
  DppCrossTenantVaultMappingsCreateOrUpdateOptionalParams,
  DppCrossTenantVaultMappingsGetOptionalParams,
} from "../../api/dppCrossTenantVaultMappings/options.js";
import type { CrossTenantVaultMapping } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a DppCrossTenantVaultMappings operations. */
export interface DppCrossTenantVaultMappingsOperations {
  /** Removes a cross-tenant vault mapping from the target vault. */
  remove: (
    resourceGroupName: string,
    vaultName: string,
    mappingName: string,
    options?: DppCrossTenantVaultMappingsRemoveOptionalParams,
  ) => Promise<void>;
  /** Lists the cross-tenant vault mappings under the target vault. */
  list: (
    resourceGroupName: string,
    vaultName: string,
    options?: DppCrossTenantVaultMappingsListOptionalParams,
  ) => PagedAsyncIterableIterator<CrossTenantVaultMapping>;
  /** Creates or updates a cross-tenant vault mapping under the target vault. */
  createOrUpdate: (
    resourceGroupName: string,
    vaultName: string,
    mappingName: string,
    resource: CrossTenantVaultMapping,
    options?: DppCrossTenantVaultMappingsCreateOrUpdateOptionalParams,
  ) => Promise<CrossTenantVaultMapping>;
  /** Gets a cross-tenant vault mapping by name from the target vault. */
  get: (
    resourceGroupName: string,
    vaultName: string,
    mappingName: string,
    options?: DppCrossTenantVaultMappingsGetOptionalParams,
  ) => Promise<CrossTenantVaultMapping>;
}

function _getDppCrossTenantVaultMappings(context: DataProtectionContext) {
  return {
    remove: (
      resourceGroupName: string,
      vaultName: string,
      mappingName: string,
      options?: DppCrossTenantVaultMappingsRemoveOptionalParams,
    ) => remove(context, resourceGroupName, vaultName, mappingName, options),
    list: (
      resourceGroupName: string,
      vaultName: string,
      options?: DppCrossTenantVaultMappingsListOptionalParams,
    ) => list(context, resourceGroupName, vaultName, options),
    createOrUpdate: (
      resourceGroupName: string,
      vaultName: string,
      mappingName: string,
      resource: CrossTenantVaultMapping,
      options?: DppCrossTenantVaultMappingsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, vaultName, mappingName, resource, options),
    get: (
      resourceGroupName: string,
      vaultName: string,
      mappingName: string,
      options?: DppCrossTenantVaultMappingsGetOptionalParams,
    ) => get(context, resourceGroupName, vaultName, mappingName, options),
  };
}

export function _getDppCrossTenantVaultMappingsOperations(
  context: DataProtectionContext,
): DppCrossTenantVaultMappingsOperations {
  return {
    ..._getDppCrossTenantVaultMappings(context),
  };
}
