// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { BlockContext } from "../../api/blockContext.js";
import { $delete, listByStoragePool, get } from "../../api/recoverableVolumeGroups/operations.js";
import type {
  RecoverableVolumeGroupsDeleteOptionalParams,
  RecoverableVolumeGroupsListByStoragePoolOptionalParams,
  RecoverableVolumeGroupsGetOptionalParams,
} from "../../api/recoverableVolumeGroups/options.js";
import type { RecoverableVolumeGroup } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a RecoverableVolumeGroups operations. */
export interface RecoverableVolumeGroupsOperations {
  /** Eradicate a recoverable volume group */
  delete: (
    resourceGroupName: string,
    storagePoolName: string,
    recoverableVolumeGroupName: string,
    options?: RecoverableVolumeGroupsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** List all recoverable volume groups in a storage pool */
  listByStoragePool: (
    resourceGroupName: string,
    storagePoolName: string,
    options?: RecoverableVolumeGroupsListByStoragePoolOptionalParams,
  ) => PagedAsyncIterableIterator<RecoverableVolumeGroup>;
  /** Get a recoverable volume group */
  get: (
    resourceGroupName: string,
    storagePoolName: string,
    recoverableVolumeGroupName: string,
    options?: RecoverableVolumeGroupsGetOptionalParams,
  ) => Promise<RecoverableVolumeGroup>;
}
function _getRecoverableVolumeGroups(context: BlockContext) {
  return {
    delete: (
      resourceGroupName: string,
      storagePoolName: string,
      recoverableVolumeGroupName: string,
      options?: RecoverableVolumeGroupsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, storagePoolName, recoverableVolumeGroupName, options),
    listByStoragePool: (
      resourceGroupName: string,
      storagePoolName: string,
      options?: RecoverableVolumeGroupsListByStoragePoolOptionalParams,
    ) => listByStoragePool(context, resourceGroupName, storagePoolName, options),
    get: (
      resourceGroupName: string,
      storagePoolName: string,
      recoverableVolumeGroupName: string,
      options?: RecoverableVolumeGroupsGetOptionalParams,
    ) => get(context, resourceGroupName, storagePoolName, recoverableVolumeGroupName, options),
  };
}
export function _getRecoverableVolumeGroupsOperations(
  context: BlockContext,
): RecoverableVolumeGroupsOperations {
  return {
    ..._getRecoverableVolumeGroups(context),
  };
}
