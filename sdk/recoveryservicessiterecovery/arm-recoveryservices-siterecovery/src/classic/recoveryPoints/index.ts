// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SiteRecoveryManagementContext } from "../../api/siteRecoveryManagementContext.js";
import { listByReplicationProtectedItems, get } from "../../api/recoveryPoints/operations.js";
import type {
  RecoveryPointsListByReplicationProtectedItemsOptionalParams,
  RecoveryPointsGetOptionalParams,
} from "../../api/recoveryPoints/options.js";
import type { RecoveryPoint } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a RecoveryPoints operations. */
export interface RecoveryPointsOperations {
  /** Lists the available recovery points for a replication protected item. */
  listByReplicationProtectedItems: (
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    protectionContainerName: string,
    replicatedProtectedItemName: string,
    options?: RecoveryPointsListByReplicationProtectedItemsOptionalParams,
  ) => PagedAsyncIterableIterator<RecoveryPoint>;
  /** Get the details of specified recovery point. */
  get: (
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    protectionContainerName: string,
    replicatedProtectedItemName: string,
    recoveryPointName: string,
    options?: RecoveryPointsGetOptionalParams,
  ) => Promise<RecoveryPoint>;
}

function _getRecoveryPoints(context: SiteRecoveryManagementContext) {
  return {
    listByReplicationProtectedItems: (
      resourceGroupName: string,
      resourceName: string,
      fabricName: string,
      protectionContainerName: string,
      replicatedProtectedItemName: string,
      options?: RecoveryPointsListByReplicationProtectedItemsOptionalParams,
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
    get: (
      resourceGroupName: string,
      resourceName: string,
      fabricName: string,
      protectionContainerName: string,
      replicatedProtectedItemName: string,
      recoveryPointName: string,
      options?: RecoveryPointsGetOptionalParams,
    ) =>
      get(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        protectionContainerName,
        replicatedProtectedItemName,
        recoveryPointName,
        options,
      ),
  };
}

export function _getRecoveryPointsOperations(
  context: SiteRecoveryManagementContext,
): RecoveryPointsOperations {
  return {
    ..._getRecoveryPoints(context),
  };
}
