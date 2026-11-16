// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SiteRecoveryManagementContext } from "../../api/siteRecoveryManagementContext.js";
import { listByReplicationProtectedItems } from "../../api/targetComputeSizes/operations.js";
import type { TargetComputeSizesListByReplicationProtectedItemsOptionalParams } from "../../api/targetComputeSizes/options.js";
import type { TargetComputeSize } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a TargetComputeSizes operations. */
export interface TargetComputeSizesOperations {
  /** Lists the available target compute sizes for a replication protected item. */
  listByReplicationProtectedItems: (
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    protectionContainerName: string,
    replicatedProtectedItemName: string,
    options?: TargetComputeSizesListByReplicationProtectedItemsOptionalParams,
  ) => PagedAsyncIterableIterator<TargetComputeSize>;
}

function _getTargetComputeSizes(context: SiteRecoveryManagementContext) {
  return {
    listByReplicationProtectedItems: (
      resourceGroupName: string,
      resourceName: string,
      fabricName: string,
      protectionContainerName: string,
      replicatedProtectedItemName: string,
      options?: TargetComputeSizesListByReplicationProtectedItemsOptionalParams,
    ) =>
      listByReplicationProtectedItems(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        protectionContainerName,
        replicatedProtectedItemName,
        options,
      ),
  };
}

export function _getTargetComputeSizesOperations(
  context: SiteRecoveryManagementContext,
): TargetComputeSizesOperations {
  return {
    ..._getTargetComputeSizes(context),
  };
}
