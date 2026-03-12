// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SiteRecoveryManagementContext } from "../../api/siteRecoveryManagementContext.js";
import { get } from "../../api/clusterRecoveryPoint/operations.js";
import type { ClusterRecoveryPointGetOptionalParams } from "../../api/clusterRecoveryPoint/options.js";
import type { ClusterRecoveryPoint } from "../../models/models.js";

/** Interface representing a ClusterRecoveryPoint operations. */
export interface ClusterRecoveryPointOperations {
  /** Get the details of specified recovery point. */
  get: (
    resourceGroupName: string,
    resourceName: string,
    fabricName: string,
    protectionContainerName: string,
    replicationProtectionClusterName: string,
    recoveryPointName: string,
    options?: ClusterRecoveryPointGetOptionalParams,
  ) => Promise<ClusterRecoveryPoint>;
}

function _getClusterRecoveryPoint(context: SiteRecoveryManagementContext) {
  return {
    get: (
      resourceGroupName: string,
      resourceName: string,
      fabricName: string,
      protectionContainerName: string,
      replicationProtectionClusterName: string,
      recoveryPointName: string,
      options?: ClusterRecoveryPointGetOptionalParams,
    ) =>
      get(
        context,
        resourceGroupName,
        resourceName,
        fabricName,
        protectionContainerName,
        replicationProtectionClusterName,
        recoveryPointName,
        options,
      ),
  };
}

export function _getClusterRecoveryPointOperations(
  context: SiteRecoveryManagementContext,
): ClusterRecoveryPointOperations {
  return {
    ..._getClusterRecoveryPoint(context),
  };
}
