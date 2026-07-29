// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MicrosoftStorageSyncContext } from "../../api/microsoftStorageSyncContext.js";
import { listByStorageSyncService, $delete, create, get } from "../../api/syncGroups/operations.js";
import type {
  SyncGroupsListByStorageSyncServiceOptionalParams,
  SyncGroupsDeleteOptionalParams,
  SyncGroupsCreateOptionalParams,
  SyncGroupsGetOptionalParams,
} from "../../api/syncGroups/options.js";
import type { SyncGroup, SyncGroupCreateParameters } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a SyncGroups operations. */
export interface SyncGroupsOperations {
  /** Get a SyncGroup List. */
  listByStorageSyncService: (
    resourceGroupName: string,
    storageSyncServiceName: string,
    options?: SyncGroupsListByStorageSyncServiceOptionalParams,
  ) => PagedAsyncIterableIterator<SyncGroup>;
  /** Delete a given SyncGroup. */
  delete: (
    resourceGroupName: string,
    storageSyncServiceName: string,
    syncGroupName: string,
    options?: SyncGroupsDeleteOptionalParams,
  ) => Promise<void>;
  /** Create a new SyncGroup. */
  create: (
    resourceGroupName: string,
    storageSyncServiceName: string,
    syncGroupName: string,
    parameters: SyncGroupCreateParameters,
    options?: SyncGroupsCreateOptionalParams,
  ) => Promise<SyncGroup>;
  /** Get a given SyncGroup. */
  get: (
    resourceGroupName: string,
    storageSyncServiceName: string,
    syncGroupName: string,
    options?: SyncGroupsGetOptionalParams,
  ) => Promise<SyncGroup>;
}

function _getSyncGroups(context: MicrosoftStorageSyncContext) {
  return {
    listByStorageSyncService: (
      resourceGroupName: string,
      storageSyncServiceName: string,
      options?: SyncGroupsListByStorageSyncServiceOptionalParams,
    ) => listByStorageSyncService(context, resourceGroupName, storageSyncServiceName, options),
    delete: (
      resourceGroupName: string,
      storageSyncServiceName: string,
      syncGroupName: string,
      options?: SyncGroupsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, storageSyncServiceName, syncGroupName, options),
    create: (
      resourceGroupName: string,
      storageSyncServiceName: string,
      syncGroupName: string,
      parameters: SyncGroupCreateParameters,
      options?: SyncGroupsCreateOptionalParams,
    ) =>
      create(
        context,
        resourceGroupName,
        storageSyncServiceName,
        syncGroupName,
        parameters,
        options,
      ),
    get: (
      resourceGroupName: string,
      storageSyncServiceName: string,
      syncGroupName: string,
      options?: SyncGroupsGetOptionalParams,
    ) => get(context, resourceGroupName, storageSyncServiceName, syncGroupName, options),
  };
}

export function _getSyncGroupsOperations(
  context: MicrosoftStorageSyncContext,
): SyncGroupsOperations {
  return {
    ..._getSyncGroups(context),
  };
}
