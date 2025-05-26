// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ServiceFabricContext } from "../../api/serviceFabricContext.js";
import { ManagedMaintenanceWindowStatus } from "../../models/models.js";
import { ManagedMaintenanceWindowStatusGetOptionalParams } from "../../api/managedMaintenanceWindowStatus/options.js";
import { get } from "../../api/managedMaintenanceWindowStatus/operations.js";

/** Interface representing a ManagedMaintenanceWindowStatus operations. */
export interface ManagedMaintenanceWindowStatusOperations {
  /** Action to get Maintenance Window Status of the Service Fabric Managed Clusters. */
  get: (
    resourceGroupName: string,
    clusterName: string,
    options?: ManagedMaintenanceWindowStatusGetOptionalParams,
  ) => Promise<ManagedMaintenanceWindowStatus>;
}

function _getManagedMaintenanceWindowStatus(context: ServiceFabricContext) {
  return {
    get: (
      resourceGroupName: string,
      clusterName: string,
      options?: ManagedMaintenanceWindowStatusGetOptionalParams,
    ) => get(context, resourceGroupName, clusterName, options),
  };
}

export function _getManagedMaintenanceWindowStatusOperations(
  context: ServiceFabricContext,
): ManagedMaintenanceWindowStatusOperations {
  return {
    ..._getManagedMaintenanceWindowStatus(context),
  };
}
