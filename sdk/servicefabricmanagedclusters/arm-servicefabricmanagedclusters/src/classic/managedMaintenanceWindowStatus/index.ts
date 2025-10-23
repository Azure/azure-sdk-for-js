// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ServiceFabricManagedClustersManagementContext } from "../../api/serviceFabricManagedClustersManagementContext.js";
import { get } from "../../api/managedMaintenanceWindowStatus/operations.js";
import type { ManagedMaintenanceWindowStatusGetOptionalParams } from "../../api/managedMaintenanceWindowStatus/options.js";
import type { ManagedMaintenanceWindowStatus } from "../../models/models.js";

/** Interface representing a ManagedMaintenanceWindowStatus operations. */
export interface ManagedMaintenanceWindowStatusOperations {
  /** Action to get Maintenance Window Status of the Service Fabric Managed Clusters. */
  get: (
    resourceGroupName: string,
    clusterName: string,
    options?: ManagedMaintenanceWindowStatusGetOptionalParams,
  ) => Promise<ManagedMaintenanceWindowStatus>;
}

function _getManagedMaintenanceWindowStatus(
  context: ServiceFabricManagedClustersManagementContext,
) {
  return {
    get: (
      resourceGroupName: string,
      clusterName: string,
      options?: ManagedMaintenanceWindowStatusGetOptionalParams,
    ) => get(context, resourceGroupName, clusterName, options),
  };
}

export function _getManagedMaintenanceWindowStatusOperations(
  context: ServiceFabricManagedClustersManagementContext,
): ManagedMaintenanceWindowStatusOperations {
  return {
    ..._getManagedMaintenanceWindowStatus(context),
  };
}
