// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ServiceFabricContext } from "../../api/serviceFabricContext.js";
import { ManagedApplyMaintenanceWindowPostOptionalParams } from "../../api/managedApplyMaintenanceWindow/options.js";
import { post } from "../../api/managedApplyMaintenanceWindow/operations.js";

/** Interface representing a ManagedApplyMaintenanceWindow operations. */
export interface ManagedApplyMaintenanceWindowOperations {
  /** Action to Apply Maintenance window on the Service Fabric Managed Clusters, right now. Any pending update will be applied. */
  post: (
    resourceGroupName: string,
    clusterName: string,
    options?: ManagedApplyMaintenanceWindowPostOptionalParams,
  ) => Promise<void>;
}

function _getManagedApplyMaintenanceWindow(context: ServiceFabricContext) {
  return {
    post: (
      resourceGroupName: string,
      clusterName: string,
      options?: ManagedApplyMaintenanceWindowPostOptionalParams,
    ) => post(context, resourceGroupName, clusterName, options),
  };
}

export function _getManagedApplyMaintenanceWindowOperations(
  context: ServiceFabricContext,
): ManagedApplyMaintenanceWindowOperations {
  return {
    ..._getManagedApplyMaintenanceWindow(context),
  };
}
