// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { StorageManagementContext } from "../../api/storageManagementContext.js";
import { listByStorageAccount } from "../../api/privateLinkResources/operations.js";
import type { PrivateLinkResourcesListByStorageAccountOptionalParams } from "../../api/privateLinkResources/options.js";
import type { PrivateLinkResourceListResult } from "../../models/models.js";

/** Interface representing a PrivateLinkResources operations. */
export interface PrivateLinkResourcesOperations {
  /** Gets the private link resources that need to be created for a storage account. */
  listByStorageAccount: (
    resourceGroupName: string,
    accountName: string,
    options?: PrivateLinkResourcesListByStorageAccountOptionalParams,
  ) => Promise<PrivateLinkResourceListResult>;
}

function _getPrivateLinkResources(context: StorageManagementContext) {
  return {
    listByStorageAccount: (
      resourceGroupName: string,
      accountName: string,
      options?: PrivateLinkResourcesListByStorageAccountOptionalParams,
    ) => listByStorageAccount(context, resourceGroupName, accountName, options),
  };
}

export function _getPrivateLinkResourcesOperations(
  context: StorageManagementContext,
): PrivateLinkResourcesOperations {
  return {
    ..._getPrivateLinkResources(context),
  };
}
