// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SiteRecoveryManagementContext } from "../../api/siteRecoveryManagementContext.js";
import { listByReplicationProtectionCluster } from "../../api/clusterRecoveryPoints/operations.js";
import type { ClusterRecoveryPointsListByReplicationProtectionClusterOptionalParams } from "../../api/clusterRecoveryPoints/options.js";
import type { ClusterRecoveryPoint } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a ClusterRecoveryPoints operations. */
export interface ClusterRecoveryPointsOperations {
  /** The list of cluster recovery points. */
  listByReplicationProtectionCluster: (
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    protectionContainerName: string,
    replicationProtectionClusterName: string,
    options?: ClusterRecoveryPointsListByReplicationProtectionClusterOptionalParams,
  ) => PagedAsyncIterableIterator<ClusterRecoveryPoint>;
}

function _getClusterRecoveryPoints(context: SiteRecoveryManagementContext) {
  return {
    listByReplicationProtectionCluster: (
      resourceGroupName: string,
      resourceName: string,
      fabricName: string,
      protectionContainerName: string,
      replicationProtectionClusterName: string,
      options?: ClusterRecoveryPointsListByReplicationProtectionClusterOptionalParams,
    ) =>
      listByReplicationProtectionCluster(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        protectionContainerName,
        replicationProtectionClusterName,
        options,
      ),
  };
}

export function _getClusterRecoveryPointsOperations(
  context: SiteRecoveryManagementContext,
): ClusterRecoveryPointsOperations {
  return {
    ..._getClusterRecoveryPoints(context),
  };
}
