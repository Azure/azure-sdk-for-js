// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SiteRecoveryManagementContext } from "../../api/siteRecoveryManagementContext.js";
import {
  listByReplicationProtectionContainers,
  get,
} from "../../api/replicationProtectableItems/operations.js";
import type {
  ReplicationProtectableItemsListByReplicationProtectionContainersOptionalParams,
  ReplicationProtectableItemsGetOptionalParams,
} from "../../api/replicationProtectableItems/options.js";
import type { ProtectableItem } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a ReplicationProtectableItems operations. */
export interface ReplicationProtectableItemsOperations {
  /** Lists the protectable items in a protection container. */
  listByReplicationProtectionContainers: (
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    protectionContainerName: string,
    options?: ReplicationProtectableItemsListByReplicationProtectionContainersOptionalParams,
  ) => PagedAsyncIterableIterator<ProtectableItem>;
  /** The operation to get the details of a protectable item. */
  get: (
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    protectionContainerName: string,
    protectableItemName: string,
    options?: ReplicationProtectableItemsGetOptionalParams,
  ) => Promise<ProtectableItem>;
}

function _getReplicationProtectableItems(context: SiteRecoveryManagementContext) {
  return {
    listByReplicationProtectionContainers: (
      resourceGroupName: string,
      resourceName: string,
      fabricName: string,
      protectionContainerName: string,
      options?: ReplicationProtectableItemsListByReplicationProtectionContainersOptionalParams,
    ) =>
      listByReplicationProtectionContainers(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        protectionContainerName,
        options,
      ),
    get: (
      resourceGroupName: string,
      resourceName: string,
      fabricName: string,
      protectionContainerName: string,
      protectableItemName: string,
      options?: ReplicationProtectableItemsGetOptionalParams,
    ) =>
      get(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        protectionContainerName,
        protectableItemName,
        options,
      ),
  };
}

export function _getReplicationProtectableItemsOperations(
  context: SiteRecoveryManagementContext,
): ReplicationProtectableItemsOperations {
  return {
    ..._getReplicationProtectableItems(context),
  };
}
