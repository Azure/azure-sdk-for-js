// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ServiceFabricManagedClustersManagementContext } from "../../api/serviceFabricManagedClustersManagementContext.js";
import { get } from "../../api/managedAzResiliencyStatus/operations.js";
import type { ManagedAzResiliencyStatusGetOptionalParams } from "../../api/managedAzResiliencyStatus/options.js";
import type { ManagedAzResiliencyStatus } from "../../models/models.js";

/** Interface representing a ManagedAzResiliencyStatus operations. */
export interface ManagedAzResiliencyStatusOperations {
  /** Action to get Az Resiliency Status of all the Base resources constituting Service Fabric Managed Clusters. */
  get: (
    resourceGroupName: string,
    clusterName: string,
    options?: ManagedAzResiliencyStatusGetOptionalParams,
  ) => Promise<ManagedAzResiliencyStatus>;
}

function _getManagedAzResiliencyStatus(context: ServiceFabricManagedClustersManagementContext) {
  return {
    get: (
      resourceGroupName: string,
      clusterName: string,
      options?: ManagedAzResiliencyStatusGetOptionalParams,
    ) => get(context, resourceGroupName, clusterName, options),
  };
}

export function _getManagedAzResiliencyStatusOperations(
  context: ServiceFabricManagedClustersManagementContext,
): ManagedAzResiliencyStatusOperations {
  return {
    ..._getManagedAzResiliencyStatus(context),
  };
}
