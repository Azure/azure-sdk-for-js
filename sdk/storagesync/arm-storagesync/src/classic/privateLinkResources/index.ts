// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MicrosoftStorageSyncContext } from "../../api/microsoftStorageSyncContext.js";
import { listByStorageSyncService } from "../../api/privateLinkResources/operations.js";
import type { PrivateLinkResourcesListByStorageSyncServiceOptionalParams } from "../../api/privateLinkResources/options.js";
import type { PrivateLinkResourceListResult } from "../../models/models.js";

/** Interface representing a PrivateLinkResources operations. */
export interface PrivateLinkResourcesOperations {
  /** Gets the private link resources that need to be created for a storage sync service. */
  listByStorageSyncService: (
    resourceGroupName: string,
    storageSyncServiceName: string,
    options?: PrivateLinkResourcesListByStorageSyncServiceOptionalParams,
  ) => Promise<PrivateLinkResourceListResult>;
}

function _getPrivateLinkResources(context: MicrosoftStorageSyncContext) {
  return {
    listByStorageSyncService: (
      resourceGroupName: string,
      storageSyncServiceName: string,
      options?: PrivateLinkResourcesListByStorageSyncServiceOptionalParams,
    ) => listByStorageSyncService(context, resourceGroupName, storageSyncServiceName, options),
  };
}

export function _getPrivateLinkResourcesOperations(
  context: MicrosoftStorageSyncContext,
): PrivateLinkResourcesOperations {
  return {
    ..._getPrivateLinkResources(context),
  };
}
