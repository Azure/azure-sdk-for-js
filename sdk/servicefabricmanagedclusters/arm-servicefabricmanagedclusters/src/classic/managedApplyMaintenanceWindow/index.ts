// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ServiceFabricManagedClustersManagementContext } from "../../api/serviceFabricManagedClustersManagementContext.js";
import { post } from "../../api/managedApplyMaintenanceWindow/operations.js";
import type { ManagedApplyMaintenanceWindowPostOptionalParams } from "../../api/managedApplyMaintenanceWindow/options.js";

/** Interface representing a ManagedApplyMaintenanceWindow operations. */
export interface ManagedApplyMaintenanceWindowOperations {
  /** Action to Apply Maintenance window on the Service Fabric Managed Clusters, right now. Any pending update will be applied. */
  post: (
    resourceGroupName: string,
    clusterName: string,
    options?: ManagedApplyMaintenanceWindowPostOptionalParams,
  ) => Promise<void>;
}

function _getManagedApplyMaintenanceWindow(context: ServiceFabricManagedClustersManagementContext) {
  return {
    post: (
      resourceGroupName: string,
      clusterName: string,
      options?: ManagedApplyMaintenanceWindowPostOptionalParams,
    ) => post(context, resourceGroupName, clusterName, options),
  };
}

export function _getManagedApplyMaintenanceWindowOperations(
  context: ServiceFabricManagedClustersManagementContext,
): ManagedApplyMaintenanceWindowOperations {
  return {
    ..._getManagedApplyMaintenanceWindow(context),
  };
}
